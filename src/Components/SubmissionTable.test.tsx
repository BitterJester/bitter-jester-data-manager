import React from 'react';
import { SubmissionTable, SubmissionsTableColumnNames, DisplayApplication } from './SubmissionTable';
import { shallow } from 'enzyme';
import { TableRow } from './Table/TableRow';
import { Table, Container } from 'reactstrap';
import { TableHeader } from './Table/TableHeader';
import { BitterJesterApplication, BitterJesterApplications } from '../Pages/Submissions/Submissions';

describe('SubmissionTable', () => {
    const submission: BitterJesterApplication = {
        id: 'id',
        bandName: 'bandName',
        primaryEmailAddress: 'primaryEmailAddress',
        firstChoiceFridayNight: 'firstChoiceFriday',
        secondChoiceFridayNight: 'secondChoiceFriday',
        isAvailableOnAllFridays: true
    }

    const prunedSubmission: DisplayApplication = {
        bandName: 'bandName',
        primaryEmailAddress: 'primaryEmailAddress',
        firstChoiceFriday: 'firstChoiceFriday',
        secondChoiceFriday: 'secondChoiceFriday'
    }

    const mockSubmissions: BitterJesterApplications = {
        completedApplications: [submission]
    };
    const component = shallow(<SubmissionTable submissions={mockSubmissions} />);

    it('should render a table', () => {
        expect(component.find(Table)).toHaveLength(1);
    });

    it('should render a container', () => {
        expect(component.find(Container)).toHaveLength(1);
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
    })

    it('should pass a submission as a prop to the submission row', () => {
        expect(component.find(TableRow).at(0).props().flattenedDataToDisplay).toEqual(prunedSubmission);
    });

});