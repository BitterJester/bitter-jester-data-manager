import React from 'react';
import { SubmissionTable, SubmissionsTableColumnNames, DisplayApplication } from './SubmissionTable';
import { shallow } from 'enzyme';
import { Container } from 'reactstrap';
import { TableHeader } from './Table/TableHeader';
import { BitterJesterApplication, BitterJesterApplications } from '../Pages/Submissions/Submissions';
import { DragAndDropList } from './DragAndDrop/DragAndDropList';

describe('SubmissionTable', () => {
    const getSubmission = (bandName) => {
        return {
            id: 'id',
            bandName: bandName,
            primaryEmailAddress: 'primaryEmailAddress',
            firstChoiceFridayNight: 'firstChoiceFriday',
            secondChoiceFridayNight: 'secondChoiceFriday',
            isAvailableOnAllFridays: true
        }
    }

    const mockSubmissions: BitterJesterApplications = {
        completedApplications: [
            getSubmission('band1'),
            getSubmission('band2')
        ]
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

        it('should render a drag and drop list', () => {
            expect(component.find(DragAndDropList)).toBeDefined();
        })
    });
});