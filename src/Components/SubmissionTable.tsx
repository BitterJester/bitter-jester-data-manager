import React from 'react';
import { Submission, Submissions } from '../Pages/Submissions/Submissions';
import { SubmissionRow } from './SubmissionRow';

type Props = {
    submissions: Submission[];
}

export const SubmissionTable = (props: Props) => {
    const {submissions} = props;

    return (
        <div>
            {
                submissions.map(submission => {
                    return <SubmissionRow key={submission.id} submission={submission}/>
                })
            }
        </div>
    );
}