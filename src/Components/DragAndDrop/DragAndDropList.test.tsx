import React from 'react';
import { shallow } from 'enzyme';
import { DragAndDropList } from './DragAndDropList';

describe('DragAndDropContainer', () => {
    const mockItems = [
        <div>
            somethingToRender
        </div>,
        <div>
            somethingElse
        </div>
    ]
    const component = shallow(<DragAndDropList initialOrderComponentsToDisplay={mockItems} orderedColumnTitles={['1','2']} updateState={jest.fn()}/>);

    it('should write tests', () => {
        expect(component).toBeDefined();
    });
});