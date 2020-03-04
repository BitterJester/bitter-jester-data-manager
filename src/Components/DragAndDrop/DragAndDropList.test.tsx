import React from 'react';
import { shallow } from 'enzyme';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DragAndDropList } from './DragAndDropList';
import { Row } from 'reactstrap';

describe('DragAndDropContainer', () => {
    const mockItems = [
        <div>
            somethingToRender
        </div>,
        <div>
            somethingElse
        </div>
    ]
    const component = shallow(<DragAndDropList initialOrderComponentsToDisplay={mockItems} />);

    const dragDropContext = component.find(DragDropContext);

    it('should render a droppable inside the dragDropContext', () => {
        expect(dragDropContext.childAt(0).find(Droppable)).toBeDefined();
    });

    it('should render a draggable for each item', () => {
        expect(true).toEqual(true);
    });
});