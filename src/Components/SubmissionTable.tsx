import React, { useState, useEffect } from 'react';
import { SubmissionTableRow } from './Table/SubmissionTableRow';
import { Container } from 'reactstrap';
import { TableHeader } from './Table/TableHeader';
import { BitterJesterApplications, BitterJesterApplication } from '../Pages/Submissions/Submissions';
import { DragDropContext, DropResult, ResponderProvided, Droppable, Draggable } from 'react-beautiful-dnd';
import { DragAndDropList } from './DragAndDrop/DragAndDropList';

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

    const pruneDownApplicationsForDisplay = (applications: BitterJesterApplication[]): any[] => {
        return applications.map((app, index) => {
            const submissionTableItem = {
                bandName: app.bandName,
                primaryEmailAddress: app.primaryEmailAddress,
                firstChoiceFriday: app.firstChoiceFridayNight || '',
                secondChoiceFriday: app.secondChoiceFridayNight || ''
            }

            return (<SubmissionTableRow key={index} flattenedDataToDisplay={submissionTableItem} />);
        });
    }

    return (
        <Container fluid>
            <TableHeader tableColumnNamesOrderedFromLeftToRight={columnNames} />
            <DragAndDropList initialOrderComponentsToDisplay={pruneDownApplicationsForDisplay(completedApplications)} />
        </Container>
    );
}