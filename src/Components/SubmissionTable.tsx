import React from 'react';
import { SubmissionTableRow } from './Table/SubmissionTableRow';
import { Table, Container } from 'reactstrap';
import { TableHeader } from './Table/TableHeader';
import { BitterJesterApplications, BitterJesterApplication } from '../Pages/Submissions/Submissions';

type Props = {
    submissions: BitterJesterApplications;
}

export type DisplayApplication = {
    bandName: string;
    primaryEmailAddress: string;
    firstChoiceFriday: string;
    secondChoiceFriday: string;
}

type DisplayApplications = DisplayApplication[];

export type SubmissionsTableColumnNames = 'Band Name' | 'Primary Email Address' | 'First Choice Friday' | 'Second Choice Friday'

export const SubmissionTable = (props: Props) => {
    const { submissions } = props;
    const columnNames: SubmissionsTableColumnNames[] = ['Band Name', 'Primary Email Address', 'First Choice Friday', 'Second Choice Friday'];
    const completedApplications = submissions.completedApplications || [];

    const pruneDownApplicationsForDisplay = (applications: BitterJesterApplication[]): DisplayApplications => {
        return applications.map(app => {
            return {
                bandName: app.bandName,
                primaryEmailAddress: app.primaryEmailAddress,
                firstChoiceFriday: app.firstChoiceFridayNight || '',
                secondChoiceFriday: app.secondChoiceFridayNight || ''
            }
        });
    }

    return (
        <Table>
            <Container fluid>
                <TableHeader tableColumnNamesOrderedFromLeftToRight={columnNames} />
                {
                    pruneDownApplicationsForDisplay(completedApplications).map(submission => {
                        return <SubmissionTableRow key={submission.bandName} flattenedDataToDisplay={submission} />
                    })
                }
            </Container>
        </Table>
    );
}