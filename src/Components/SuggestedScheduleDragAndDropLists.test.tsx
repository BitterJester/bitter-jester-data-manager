import React from 'react';
import { shallow } from 'enzyme';
import { Row } from 'reactstrap';
import { SuggestedScheduleDragAndDropLists } from './SuggestedScheduleDragAndDropLists';
import { Title } from './Title';
import { TableHeader } from './Table/TableHeader';
import { DragAndDropList } from './DragAndDrop/DragAndDropList';
import { PrunedApplication } from '../Containers/SubmissionContainer';

describe('SuggestedScheduleDragAndDropLists', () => {
    const band1 = {
        bandName: 'band1',
        primaryEmailAddress: 'email',
        firstChoiceFridayNight: 'first',
        secondChoiceFridayNight: 'second'
    };
    const newLocal = {
        bandName: 'band2',
        primaryEmailAddress: 'email',
        firstChoiceFridayNight: 'first',
        secondChoiceFridayNight: 'second'
    };
    const applications: PrunedApplication[] = [
        band1,
        newLocal
    ];
    const component = shallow(<SuggestedScheduleDragAndDropLists applications={applications} />);

    it('should render a title', () => {
        expect(component.find(Title).props().titleDisplayText).toEqual('Suggested Friday Night Schedule');
    });

    it('should render a table header', () => {
        expect(component.find(TableHeader).props().tableColumnNamesOrderedFromLeftToRight).toEqual(
            [
                '6/5',
                '6/12',
                '6/19',
                '6/26'
            ]
        )
    });

    it('should render a row', () => {
        expect(component.find(Row)).toHaveLength(1);
    });

    it('should render a dragAndDropList for each night', () => {
        expect(component.find(DragAndDropList)).toHaveLength(4);
    });
})