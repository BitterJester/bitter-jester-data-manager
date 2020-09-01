import {JudgeFeedback} from "../Cards/OriginalSongJudgingFormCard";
import React from "react";

type Props = { comment: JudgeFeedback };

export const JudgesFeedbackItem = (props: Props) => {
    const {comment} = props;
    const {judge, songInfo, initialImpression, feedback, favoriteAspect} = comment;

    return (
        <div>
            <h3 style={{fontWeight: "bold"}}>
                {`Judge: ${judge.nickname}`}
            </h3>
            <p style={{fontWeight: "bold"}}>
                {`"${songInfo.songName}"`}
            </p>
            <p>
                {`Initial Impression: ${initialImpression}`}
            </p>
            <p>
                {`Feedback: ${feedback}`}
            </p>
            <p>
                {`Favorite Aspect: ${favoriteAspect}`}
            </p>
        </div>
    );
};