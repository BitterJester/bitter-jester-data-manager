import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import DroppableList from './DroppableList';
import { Col } from 'reactstrap';

type Props = {
    initialOrderComponentsToDisplay: any[];
};

export const DragAndDropList = (props: Props) => {
    const initialItems = props.initialOrderComponentsToDisplay;
    const [orderedItemsForDisplay, setOrderedItemsForDisplay] = useState(initialItems);

    useEffect(() => {
        setOrderedItemsForDisplay(initialItems);
    }, [initialItems]);

    const reorder = (listOfLists: any[], result: DropResult): any[] => {
        const sourceDroppableIndex = result.source.droppableId.split('-')[1];
        const listToRemoveFrom = listOfLists[sourceDroppableIndex];
        const [removed] = listToRemoveFrom.splice(result.source.index, 1);

        const requestedIndexToDropIn = result.destination.droppableId.split('-')[1];
        const destination = result.destination;
        const listToAddTo = listOfLists[requestedIndexToDropIn];

        listToAddTo.splice(destination.index, 0, removed);

        return listOfLists;
    };

    const onDragEnd = (result: DropResult, provided: ResponderProvided) => {

        console.log(result.destination);
        if (!result.destination) {
            return null;
        }
        const reorderedSubmissions = reorder(orderedItemsForDisplay, result);
        setOrderedItemsForDisplay(reorderedSubmissions);
    };

    // Temporary hack to make this not break when this loads without the proper list
    if (orderedItemsForDisplay.length !== 4) {
        return null;
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {
                orderedItemsForDisplay.map((item, index) => {
                    return <Col><DroppableList orderInList={index} orderedItemsForDisplay={item} /></Col>
                })
            }
        </DragDropContext>
    )
}