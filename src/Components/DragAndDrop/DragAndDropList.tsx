import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult, ResponderProvided, Draggable } from 'react-beautiful-dnd';

type Props = {
    initialOrderComponentsToDisplay: any[];
};

export const DragAndDropList = (props: Props) => {
    const initialItems = props.initialOrderComponentsToDisplay;
    const [orderedItemsForDisplay, setOrderedItemsForDisplay] = useState(initialItems);

    useEffect(() => {
        setOrderedItemsForDisplay(initialItems);
    }, [initialItems])

    const grid = 8;

    const reorder = (list: any[], result: DropResult): any[] => {
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
        font: 'bold 20px helvetica, arial, sans-serif',
        background: isDragging ? "#8f6daf" : "#7b5d97",

        ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "#ffcc00" : "#e79e31",
        padding: grid,
        width: '100%'
    });

    const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
        if (!result.destination) {
            return null;
        }
        const reorderedSubmissions = reorder(orderedItemsForDisplay, result);
        setOrderedItemsForDisplay(reorderedSubmissions);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        {orderedItemsForDisplay.map((item, index) => (
                            <Draggable key={index} draggableId={`${index}`} index={index}>
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
                                        {item}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}