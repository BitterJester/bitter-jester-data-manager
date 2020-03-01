import React from 'react';
import { TableRow } from './Table/TableRow';
import { Table, Container } from 'reactstrap';
import { TableHeader } from './Table/TableHeader';
import { BitterJesterApplications } from '../Pages/Submissions/Submissions';

type Props = {
    submissions: BitterJesterApplications;
}

export type SubmissionsTableColumnNames = 'Band Name' | 'Primary Email Address' | 'First Choice Friday' | 'Second Choice Friday'

export const SubmissionTable = (props: Props) => {
    const { submissions } = props;

    const columnNames: SubmissionsTableColumnNames[] = ['Band Name', 'Primary Email Address', 'First Choice Friday', 'Second Choice Friday'];

    const completedApplications = submissions.completedApplications || [];
    return (
        <Table>
            <Container>
                <TableHeader tableColumnNamesOrderedFromLeftToRight={columnNames} />
                {
                    completedApplications.map(submission => {
                        return <TableRow key={submission.id} flattenedDataToDisplay={submission} />
                    })
                }
            </Container>
        </Table>
    );
}