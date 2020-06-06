import React, {useEffect, useState} from 'react';
import {S3Client} from "../aws/s3Client";
import {Judge, JudgeFeedback} from "./Cards/OriginalSongJudgingFormCard";
import _ from 'lodash';

type JudgesWhoHaveNotSubmittedAllComments = {
    judge: Judge;
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
            {
                judgesComments && judgesComments.comments.map((comment, index) => {
                        return (
                            <div>
                                {index === 0 &&
                                <h3 style={{fontWeight: 'bold'}}>
                                    {`Judge: ${comment.judge.nickname}`}
                                </h3>
                                }
                                <p style={{fontWeight: 'bold'}}>
                                    {`Song Name: ${comment.songInfo.songName}`}
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
    );
};

export default WeeklyJudgesCommentsContainer;