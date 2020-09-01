import React, {Fragment} from 'react';
import {Title} from "../Title";
import {AggregatedJudgesComments} from "./WeeklyJudgesCommentsContainer";
import {JudgesFeedbackItem} from "./JudgesFeedbackItem";

type Props = {
    judgesComments: AggregatedJudgesComments;
}

const JudgesFeedbackForWeekContent = (props: Props) => {
    const {judgesComments} = props;
    return (
        <Fragment>
            <Title titleDisplayText={'JUDGES FEEDBACK'}/>
            <div className={'weekly-judges-feedback-container'}>
                {
                    judgesComments && judgesComments.comments.map((comment) =>
                        (
                            <JudgesFeedbackItem comment={comment}/>
                        )
                    )
                }
            </div>
        </Fragment>
    );
};

export default JudgesFeedbackForWeekContent;