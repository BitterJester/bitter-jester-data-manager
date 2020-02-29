import React from 'react';
import { Submission, Submissions } from '../Pages/Submissions/Submissions';
import { TableRow } from './Table/TableRow';
import { Table } from 'reactstrap';
import { TableHeader } from './Table/TableHeader';

type Props = {
    submissions: Submission[];
}

export const SubmissionTable = (props: Props) => {
    const { submissions } = props;

    const columnNames: string[] = ['id', 'ip', 'answers', 'form_id', 'created_at', 'status', 'new', 'flag', 'notes', 'updated_at'];

    return (
        <Table>
            <TableHeader tableColumnNamesOrderedFromLeftToRight={columnNames}/>
            {
                submissions.map(submission => {
                    return <TableRow key={submission.id} flattenedDataToDisplay={submission} />
                })
            }
        </Table>
    );
}