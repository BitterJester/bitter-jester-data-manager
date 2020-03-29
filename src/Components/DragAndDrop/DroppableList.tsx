import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

type Props = {
    orderInList: number;
    orderedItemsForDisplay: any[];
};

const DroppableList = (props: Props) => {
    const { orderInList, orderedItemsForDisplay } = props;
    const grid = 8;

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

    const droppableId = `droppable-${orderInList}`;
    return (
            <Droppable droppableId={droppableId}>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        {orderedItemsForDisplay.map((item, index) => (
                            <Draggable key={index} draggableId={`${droppableId}=${index}`} index={index}>
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
    );
};

export default DroppableList;