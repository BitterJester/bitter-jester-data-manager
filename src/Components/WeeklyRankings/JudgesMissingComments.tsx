import React from 'react';
import {AggregatedJudgesComments} from "./WeeklyJudgesCommentsContainer";

type Props = {
    judgesComments: AggregatedJudgesComments;
}

const JudgesMissingComments = (props: Props) => {
    const {judgesComments} = props;
    return (
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
    );
};

export default JudgesMissingComments;