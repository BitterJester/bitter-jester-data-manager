import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { TableHeader } from '../Components/Table/TableHeader';
import { BitterJesterApplications, BitterJesterApplication } from '../Pages/Submissions/Submissions';
import { DragAndDropList } from '../Components/DragAndDrop/DragAndDropList';
import { Title } from '../Components/Title';
import { SubmissionTableRow } from '../Components/Table/SubmissionTableRow';

type Props = {
    submissions: BitterJesterApplications;
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

    const pruneDownApplicationsForDisplay = (applications: BitterJesterApplication[]): any[] => {
        return applications.map((app, index) => {
            return {
                bandName: app.bandName,
                primaryEmailAddress: app.primaryEmailAddress,
                firstChoiceFriday: app.firstChoiceFridayNight || '',
                secondChoiceFriday: app.secondChoiceFridayNight || ''
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
                <Title titleDisplayText={'Suggested Friday Night Schedule'} />
            <TableHeader tableColumnNamesOrderedFromLeftToRight={['6/5', '6/12', '6/19', '6/26']} />
            <Row>
                <Col>
                    <DragAndDropList initialOrderComponentsToDisplay={bandNames} />
                </Col>
                <Col>
                    <DragAndDropList initialOrderComponentsToDisplay={bandNames} />
                </Col>
                <Col>
                    <DragAndDropList initialOrderComponentsToDisplay={bandNames} />
                </Col>
                <Col>
                    <DragAndDropList initialOrderComponentsToDisplay={bandNames} />
                </Col>
            </Row>
        </Container>
    );
}