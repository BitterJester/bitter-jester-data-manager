import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { TableHeader } from '../Components/Table/TableHeader';
import { BitterJesterApplications, BitterJesterApplication } from '../Pages/Submissions/Submissions';
import { DragAndDropList } from '../Components/DragAndDrop/DragAndDropList';
import { Title } from '../Components/Title';
import { SubmissionTableRow } from '../Components/Table/SubmissionTableRow';
import { SuggestedScheduleDragAndDropLists } from '../Components/SuggestedScheduleDragAndDropLists';

type Props = {
    submissions: BitterJesterApplications;
}

export type PrunedApplication = {
    bandName: string;
    primaryEmailAddress: string;
    firstChoiceFridayNight: string;
    secondChoiceFridayNight: string;
}

export type SubmissionsTableColumnNames = 'Band Name' | 'Primary Email Address' | 'First Choice Friday' | 'Second Choice Friday'

export const SubmissionContainer = (props: Props) => {
    const { submissions } = props;

    const columnNames: SubmissionsTableColumnNames[] = [
        'Band Name',
        'Primary Email Address',
        'First Choice Friday',
        'Second Choice Friday'
    ];
    const completedApplications = submissions.completedApplications || [];

    const pruneDownApplicationsForDisplay = (applications: BitterJesterApplication[]): PrunedApplication[] => {
        return applications.map((app, index) => {
            return {
                bandName: app.bandName,
                primaryEmailAddress: app.primaryEmailAddress,
                firstChoiceFridayNight: app.firstChoiceFridayNight || '',
                secondChoiceFridayNight: app.secondChoiceFridayNight || ''
            };
        });
    }

    const prunedApplications = pruneDownApplicationsForDisplay(completedApplications);

    const submissionRows = prunedApplications.map((prunedApplication, index) => {
        return <SubmissionTableRow key={index} flattenedDataToDisplay={prunedApplication} />
    });

    const bandNames = prunedApplications.map((prunedApplication, index) => {
        return <SubmissionTableRow key={index} flattenedDataToDisplay={{ bandName: prunedApplication.bandName }} />
    })

    return (
        <Container fluid>
            <TableHeader tableColumnNamesOrderedFromLeftToRight={columnNames} />
            <Row>
                <DragAndDropList initialOrderComponentsToDisplay={submissionRows} />
            </Row>
            <SuggestedScheduleDragAndDropLists applications={prunedApplications}/>
        </Container>
    );
}