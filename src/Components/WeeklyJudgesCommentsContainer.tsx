import React, {useEffect, useState} from 'react';
import {S3Client} from "../aws/s3Client";
import {Judge, JudgeFeedback} from "./Cards/OriginalSongJudgingFormCard";
import _ from 'lodash';
import {JudgesInfo} from "../Pages/OriginalSongCompetition";
import {Title} from "./Title";

type JudgesWhoHaveNotSubmittedAllComments = {
    judge: JudgesInfo;
    numberOfSongsWithAllComments: number;
}

type AggregatedJudgesComments = {
    comments: JudgeFeedback[];
    allCommentsAreSubmitted: boolean;
    judgesWhoHaveNotSubmittedAllComments: JudgesWhoHaveNotSubmittedAllComments[];
    numberOfJudgesWhoHaveNotSubmittedAllComments: number;
    judge?: Judge;
}

const WeeklyJudgesCommentsContainer = () => {
    const initialJudgesComments: AggregatedJudgesComments = {
        comments: [],
        allCommentsAreSubmitted: false,
        judgesWhoHaveNotSubmittedAllComments: [],
        numberOfJudgesWhoHaveNotSubmittedAllComments: 0
    };
    const [judgesComments, setJudgesComments] = useState(initialJudgesComments);

    useEffect(() => {
        const s3Client = new S3Client();

        const fetch = async () => {
            const aggregatedJudgesComments = await s3Client.getObject('aggregated-judges-comments.json') as AggregatedJudgesComments;

            aggregatedJudgesComments.comments = _.orderBy(aggregatedJudgesComments.comments, 'judge.email')
            setJudgesComments(aggregatedJudgesComments);
        };

        fetch();
    }, []);

    return (
        <div style={{textAlign: 'left'}}>
            <Title titleDisplayText={'JUDGES MISSING COMMENTS'}/>
            <div style={{textAlign: 'center'}}>
                {
                    judgesComments && judgesComments.judgesWhoHaveNotSubmittedAllComments.map(judge => {
                        return (
                            <p>
                                {`${judge.judge.emailAddress} has completed comments for ${judge.numberOfSongsWithAllComments} of 14 songs.`}
                            </p>

                        )
                    })
                }
            </div>
            <Title titleDisplayText={'JUDGES FEEDBACK'}/>
            <div style={{overflowY: 'scroll', maxHeight: '800px'}}>
                {
                    judgesComments && judgesComments.comments.map((comment) => {
                            return (
                                <div>
                                    {
                                        <h3 style={{fontWeight: 'bold'}}>
                                            {`Judge: ${comment.judge.nickname}`}
                                        </h3>
                                    }
                                    <p style={{fontWeight: 'bold'}}>
                                        {`"${comment.songInfo.songName}"`}
                                    </p>
                                    <p>
                                        {`Initial Impression: ${comment.initialImpression}`}
                                    </p>
                                    <p>
                                        {`Feedback: ${comment.feedback}`}
                                    </p>
                                    <p>
                                        {`Favorite Aspect: ${comment.favoriteAspect}`}
                                    </p>
                                </div>
                            )
                        }
                    )
                }
            </div>
        </div>
    );
};

export default WeeklyJudgesCommentsContainer;