import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import DroppableList from './DroppableList';
import { Col } from 'reactstrap';
import { Title } from '../Title';
import _ from 'lodash';

type Props = {
    initialOrderComponentsToDisplay: any[];
    getItemStyle?: Function;
    orderedColumnTitles: string[];
    updateState: Function;
};

export const DragAndDropList = (props: Props) => {
    const { initialOrderComponentsToDisplay, getItemStyle } = props;
    const [orderedItemsForDisplay, setOrderedItemsForDisplay] = useState(initialOrderComponentsToDisplay);

    useEffect(() => {
        setOrderedItemsForDisplay(initialOrderComponentsToDisplay);
    }, [initialOrderComponentsToDisplay]);

    const reorder = (listOfLists: any[], result: DropResult): any[] => {
        const sourceDroppableIndex = result.source.droppableId.split('-')[1];
        const listToRemoveFrom = listOfLists[sourceDroppableIndex];
        const [removed] = listToRemoveFrom.splice(result.source.index, 1);
        const requestedIndexToDropIn = result.destination.droppableId.split('-')[1];
        const destination = result.destination;
        const listToAddTo = listOfLists[requestedIndexToDropIn];

        listToAddTo.splice(destination.index, 0, removed);
        props.updateState(sourceDroppableIndex, result.source.index, requestedIndexToDropIn);

        return listOfLists;
    };

    const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
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

    const columnTitlesCopy = _.cloneDeep(props.orderedColumnTitles);
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {
                orderedItemsForDisplay.map((item, index) => {
                    return (
                        <Col style={{ background: 'rgb(204, 202, 202)' }}>
                            <Title titleDisplayText={columnTitlesCopy.shift()}/>
                            <DroppableList orderInList={index} orderedItemsForDisplay={item} getItemStyle={getItemStyle} />
                        </Col>
                    );
                })
            }
        </DragDropContext>
    )
}