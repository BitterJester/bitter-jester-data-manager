import React from 'react';
import { TableRow } from './Table/TableRow';
import { Table, Container } from 'reactstrap';
import { TableHeader } from './Table/TableHeader';
import { BitterJesterApplication } from '../Pages/Submissions/Submissions';

type Props = {
    submissions: BitterJesterApplication[];
}

export type SubmissionsTableColumnNames = 'Band Name' | 'Primary Email Address' | 'First Choice Friday'

export const SubmissionTable = (props: Props) => {
    const { submissions } = props;

    const columnNames: SubmissionsTableColumnNames[] = ['Band Name', 'Primary Email Address', 'First Choice Friday'];

    return (
        <Table>
            <Container>
                <TableHeader tableColumnNamesOrderedFromLeftToRight={columnNames} />
                {
                    submissions.map(submission => {
                        return <TableRow key={submission.id} flattenedDataToDisplay={submission} />
                    })
                }
            </Container>
        </Table>
    );
}