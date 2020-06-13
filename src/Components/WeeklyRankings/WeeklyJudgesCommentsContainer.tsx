import React, {useEffect, useState} from 'react';
import {S3Client} from "../../aws/s3Client";
import {Judge, JudgeFeedback} from "../Cards/OriginalSongJudgingFormCard";
import _ from 'lodash';
import {JudgesInfo} from "../../Pages/OriginalSongCompetition";
import WeeklyJudgesFeedback from "./WeeklyJudgesFeedback";
import JudgesMissingComments from "./JudgesMissingComments";

type JudgesWhoHaveNotSubmittedAllComments = {
    judge: JudgesInfo;
    numberOfSongsWithAllComments: number;
}

export type AggregatedJudgesComments = {
    comments: JudgeFeedback[];
    allCommentsAreSubmitted: boolean;
    judgesWhoHaveNotSubmittedAllComments: JudgesWhoHaveNotSubmittedAllComments[];
    numberOfJudgesWhoHaveNotSubmittedAllComments: number;
    judge?: Judge;
}

type Props = {
    week: number;
}

const WeeklyJudgesCommentsContainer = (props: Props) => {
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
            const aggregatedJudgesComments = await s3Client.getObject(`week=${props.week}/aggregated-judges-comments.json`) as AggregatedJudgesComments;

            aggregatedJudgesComments.comments = _.orderBy(aggregatedJudgesComments.comments, 'judge.email')
            setJudgesComments(aggregatedJudgesComments);
        };

        fetch();
    }, [props.week]);

    return (
        <div style={{textAlign: 'left'}}>
            {
                judgesComments.numberOfJudgesWhoHaveNotSubmittedAllComments > 0 &&
                <JudgesMissingComments judgesComments={judgesComments}/>
            }
            <WeeklyJudgesFeedback judgesComments={judgesComments}/>
        </div>
    );
};

export default WeeklyJudgesCommentsContainer;