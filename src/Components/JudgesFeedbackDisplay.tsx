import React, {useEffect, useState} from 'react';
import {S3Client} from "../aws/s3Client";
import {OriginalSong} from "../Pages/OriginalSongCompetition";
import {formatJudgesCommentsFilePath, JudgeFeedback} from "./Cards/OriginalSongJudgingFormCard";

type Props = {
    originalSongs: OriginalSong[];
}

const JudgesFeedbackDisplay = (props: Props) => {
    const [judgesComments, setJudgesComments] = useState([] as JudgeFeedback[]);
    const {originalSongs} = props;

    useEffect(() => {
        const fetch = async () => {
            const prefix = formatJudgesCommentsFilePath('9 a.m.', 'Austin and Ally');
            console.log('prefix: ', prefix);
            const s3Client = new S3Client();
            const returnedJudgesComments = await s3Client.getObjectsInFolder(
                'bitter-jester-test',
                prefix
            ) as JudgeFeedback[];
            console.log(returnedJudgesComments);
            if (returnedJudgesComments) {
                setJudgesComments(returnedJudgesComments);
            }
        };

        fetch()
    }, [originalSongs]);

    return (
        <div>
            {judgesComments.length}
        </div>
    );
};

export default JudgesFeedbackDisplay;