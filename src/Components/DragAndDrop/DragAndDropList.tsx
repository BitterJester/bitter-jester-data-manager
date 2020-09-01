import React, {useEffect, useState} from 'react';
import {DragDropContext, DropResult, ResponderProvided} from 'react-beautiful-dnd';
import DroppableList from './DroppableList';
import {Col} from 'reactstrap';
import {Title} from '../Title';
import _ from 'lodash';

type Props = {
    initialOrderComponentsToDisplay: any[];
    getItemStyle?: Function;
    orderedColumnTitles: string[];
    updateState: Function;
};

export const DragAndDropList = (props: Props) => {
    const {initialOrderComponentsToDisplay, getItemStyle} = props;
    const [orderedItemsForDisplay, setOrderedItemsForDisplay] = useState(initialOrderComponentsToDisplay);
    useEffect(() => {
        setOrderedItemsForDisplay(initialOrderComponentsToDisplay);
    }, [initialOrderComponentsToDisplay]);

    const getDroppableIndex = (droppableId) => droppableId.split('-')[1];

    const reorder = (listOfLists: any[], result: DropResult): any[] => {
        const {source, destination} = result;
        const {droppableId: sourceDroppableId, index: sourceIndex} = source;
        const {droppableId: destinationDroppableId, index: destinationIndex} = destination;

        const sourceListIndex = getDroppableIndex(sourceDroppableId);
        const listToRemoveFrom = listOfLists[sourceListIndex];
        const [itemToMove] = listToRemoveFrom.splice(sourceIndex, 1);

        const requestedIndexToDropIn = getDroppableIndex(destinationDroppableId);
        const listToAddTo = listOfLists[requestedIndexToDropIn];

        listToAddTo.splice(destinationIndex, 0, itemToMove);
        props.updateState(sourceListIndex, sourceIndex, requestedIndexToDropIn, destination.index);

        return listOfLists;
    };

    const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
        if (!result.destination) {
            return null;
        }
        const reorderedSubmissions = reorder(orderedItemsForDisplay, result);
        setOrderedItemsForDisplay(reorderedSubmissions);
    };

    const columnTitlesCopy = _.cloneDeep(props.orderedColumnTitles);
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {
                orderedItemsForDisplay.map((item, index) => {
                    return (
                        <Col style={{background: 'rgb(204, 202, 202)'}}>
                            <Title titleDisplayText={columnTitlesCopy.shift()}/>
                            <DroppableList
                                orderInList={index}
                                orderedItemsForDisplay={item}
                                getItemStyle={getItemStyle}
                            />
                        </Col>
                    );
                })
            }
        </DragDropContext>
    )
};