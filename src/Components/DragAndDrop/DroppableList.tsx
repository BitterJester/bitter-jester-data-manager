import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

type Props = {
    getItemStyle?: Function;
    orderInList: number;
    orderedItemsForDisplay: any[];
};

const DroppableList = (props: Props) => {
    const { orderInList, orderedItemsForDisplay } = props;
    const grid = 8;

    const getDefaultItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,
        font: 'bold 20px helvetica, arial, sans-serif',
        background: isDragging ? "#8f6daf" : "linear-gradient(90deg, rgba(123, 93, 151, 1) 35%, rgba(231, 158, 49, 1) 100%)",
        color: 'white',
        ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
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
                            {(provided, snapshot) => {
                                const itemStyle = props.getItemStyle(snapshot.isDragging, provided.draggableProps.style) || getDefaultItemStyle(snapshot.isDragging, provided.draggableProps.style);
                                return (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={itemStyle}
                                    >
                                        {item}
                                    </div>
                                );
                            }
                            }
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default DroppableList;