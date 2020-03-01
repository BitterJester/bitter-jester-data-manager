import React from 'react';
import { TableRow } from './Table/TableRow';
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
        const temp =  applications.map(app => {
            return {
                bandName: app.bandName,
                primaryEmailAddress: app.primaryEmailAddress,
                firstChoiceFriday: app.firstChoiceFridayNight || '',
                secondChoiceFriday: app.secondChoiceFridayNight || ''
            }
        });


        console.log(temp);

        return temp;
    }

    return (
        <Table>
            <Container fluid>
                <TableHeader tableColumnNamesOrderedFromLeftToRight={columnNames} />
                {
                    pruneDownApplicationsForDisplay(completedApplications).map(submission => {
                        return <TableRow key={submission.id} flattenedDataToDisplay={submission} />
                    })
                }
            </Container>
        </Table>
    );
}