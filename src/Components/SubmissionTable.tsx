import React, { useState, useEffect } from 'react';
import { SubmissionTableRow } from './Table/SubmissionTableRow';
import { Container } from 'reactstrap';
import { TableHeader } from './Table/TableHeader';
import { BitterJesterApplications, BitterJesterApplication } from '../Pages/Submissions/Submissions';
import { DragDropContext, DropResult, ResponderProvided, Droppable, Draggable } from 'react-beautiful-dnd';

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
    console.log(`non ordered or pruned ${completedApplications}`);

    const [orderedSubmissionsForDisplay, setOrderedSubmissionsForDisplay] = useState([]);

    useEffect(() => {
        const prunedDownApplications = pruneDownApplicationsForDisplay(completedApplications);
        console.log(`prunedd ${prunedDownApplications}`);
        setOrderedSubmissionsForDisplay(prunedDownApplications);
    }, [completedApplications]);

    console.log(`ordered: ${orderedSubmissionsForDisplay}`);

    const grid = 8;

    const reorder = (list: DisplayApplication[], result: DropResult): DisplayApplication[] => {
        const [removed] = list.splice(result.source.index, 1);
        const destination = result.destination;

        if (destination) {
            list.splice(destination.index, 0, removed);
        }

        return list;
    };

    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,

        background: isDragging ? "lightgreen" : "grey",

        ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: grid,
        width: '100%'
    });

    const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
        if (!result.destination) {
            return null;
        }
        const reorderedSubmissions = reorder(orderedSubmissionsForDisplay, result);
        setOrderedSubmissionsForDisplay(reorderedSubmissions);
    };

    return (
        <Container fluid>
            <TableHeader tableColumnNamesOrderedFromLeftToRight={columnNames} />
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {orderedSubmissionsForDisplay.map((item, index) => (
                                <Draggable key={item.bandName} draggableId={item.bandName} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            {
                                                <SubmissionTableRow key={index} flattenedDataToDisplay={item} />
                                            }
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </Container>
    );
}