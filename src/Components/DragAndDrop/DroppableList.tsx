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
        background: 'white',
        color: 'white',
        ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
        padding: grid,
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
                                const itemStyle = props.getItemStyle ? props.getItemStyle(snapshot.isDragging, provided.draggableProps.style) : getDefaultItemStyle(snapshot.isDragging, provided.draggableProps.style);
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