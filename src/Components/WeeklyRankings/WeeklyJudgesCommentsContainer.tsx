import React, {useEffect, useState} from 'react';
import {S3Client} from "../../aws/s3Client";
import {Judge, JudgeFeedback} from "../Cards/OriginalSongJudgingFormCard";
import _ from 'lodash';
import {JudgesInfo} from "../../pages/OriginalSongCompetition";
import JudgesFeedbackForWeekContent from "./JudgesFeedbackForWeekContent";
import JudgesMissingComments from "./JudgesMissingComments";
import {Alert} from "reactstrap";
import CardContainer from "../Cards/CardContainer";
import {getFromS3} from "../../aws/getFromS3";

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
        const fetch = async () => {
            // await getFromS3(`week=${props.week}/aggregated-judges-comments.json`, (aggregatedJudgesComments) => {
            //     aggregatedJudgesComments.comments = _.orderBy(aggregatedJudgesComments.comments, 'judge.email')
            //     setJudgesComments(aggregatedJudgesComments);
            // });
        };

        fetch();
    }, [props.week]);

    return (
        <CardContainer className={'weekly-judges-comments-container'} style={{textAlign: 'left'}}>
            <div className={'all-judges-have-submitted-alert'}>
                <Alert isOpen={judgesComments.numberOfJudgesWhoHaveNotSubmittedAllComments === 0} color={'success'}>
                    {'All judges have submitted their comments for this week!'}
                </Alert>
            </div>
            {
                judgesComments.numberOfJudgesWhoHaveNotSubmittedAllComments > 0 &&
                <JudgesMissingComments judgesComments={judgesComments}/>
            }
            <JudgesFeedbackForWeekContent judgesComments={judgesComments}/>
        </CardContainer>
    );
};

export default WeeklyJudgesCommentsContainer;