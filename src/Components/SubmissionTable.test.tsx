import React from 'react';
import { SubmissionTable, SubmissionsTableColumnNames, DisplayApplication } from './SubmissionTable';
import { shallow } from 'enzyme';
import { SubmissionTableRow } from './Table/SubmissionTableRow';
import { Table, Container } from 'reactstrap';
import { TableHeader } from './Table/TableHeader';
import { BitterJesterApplication, BitterJesterApplications } from '../Pages/Submissions/Submissions';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

describe('SubmissionTable', () => {
    const submission: BitterJesterApplication = {
        id: 'id',
        bandName: 'bandName',
        primaryEmailAddress: 'primaryEmailAddress',
        firstChoiceFridayNight: 'firstChoiceFriday',
        secondChoiceFridayNight: 'secondChoiceFriday',
        isAvailableOnAllFridays: true
    }

    const getDisplayApplication = (): DisplayApplication => {
        return {
            bandName: 'bandName',
            primaryEmailAddress: 'primaryEmailAddress',
            firstChoiceFriday: 'firstChoiceFriday',
            secondChoiceFriday: 'secondChoiceFriday'
        };
    };

    const prunedSubmission1: DisplayApplication = getDisplayApplication();
    const prunedSubmission2: DisplayApplication = getDisplayApplication();

    const mockSubmissions: BitterJesterApplications = {
        completedApplications: [submission]
    };
    const component = shallow(<SubmissionTable submissions={mockSubmissions} />);

    const container = component.find(Container);
    it('should render a container', () => {
        expect(container).toHaveLength(1);
    })

    it('should render a table header', () => {
        expect(component.find(TableHeader)).toHaveLength(1);
    });

    it('should pass submission object keys as column names to table header', () => {
        const expected: SubmissionsTableColumnNames[] = [
            'Band Name',
            'Primary Email Address',
            'First Choice Friday',
            'Second Choice Friday'
        ];
        expect(component.find(TableHeader).props().tableColumnNamesOrderedFromLeftToRight).toEqual(expected);
    });

    describe('Drag and Drop', () => {
        const dropResult: DropResult = {
            source: {
                index: 0,
                droppableId: ''
            },
            destination: {
                index: 1,
                droppableId: ''
            },
            reason: null,
            type: null,
            mode: null,
            draggableId: ''
        };
        const dragDropContext = container.childAt(1).find(DragDropContext);
        dragDropContext.props().onDragEnd(dropResult, null);

        it('should have tests written eventually', () => {
            expect(true).toEqual(true);
        })
    });
});