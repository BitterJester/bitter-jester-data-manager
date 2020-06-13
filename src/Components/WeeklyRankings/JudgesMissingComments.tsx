import React, {Fragment} from 'react';
import {AggregatedJudgesComments} from "./WeeklyJudgesCommentsContainer";
import {Title} from "../Title";

type Props = {
    judgesComments: AggregatedJudgesComments;
}

const JudgesMissingComments = (props: Props) => {
    const {judgesComments} = props;
    return (
        <Fragment>
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
        </Fragment>
    );
};

export default JudgesMissingComments;