import React, {Fragment} from 'react';
import {Title} from "../Title";
import {AggregatedJudgesComments} from "./WeeklyJudgesCommentsContainer";

type Props = {
    judgesComments: AggregatedJudgesComments;
}

const WeeklyJudgesFeedback = (props: Props) => {
    const {judgesComments} = props;
    return (
        <Fragment>
            <Title titleDisplayText={'JUDGES FEEDBACK'}/>
            <div className={'weekly-judges-feedback-container'}>
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
        </Fragment>
    );
};

export default WeeklyJudgesFeedback;