import React from 'react';
import { SubmissionTable, SubmissionsTableColumnNames } from './SubmissionTable';
import { shallow } from 'enzyme';
import { TableRow } from './Table/TableRow';
import {Table, Container} from 'reactstrap';
import { TableHeader } from './Table/TableHeader';
import { BitterJesterApplication } from '../Pages/Submissions/Submissions';

describe('SubmissionTable', () => {
    const submission: BitterJesterApplication = {
        id: 'id',
        bandName: 'bandName',
        primaryEmailAddress: 'primaryEmailAddress',
        firstChoiceFriday: 'firstChoiceFriday'
    }

    const mockSubmissions: BitterJesterApplication[] = [
        submission
    ];
    const component = shallow(<SubmissionTable submissions={mockSubmissions}/>);

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
        const expected: SubmissionsTableColumnNames[] = ['Band Name', 'Primary Email Address', 'First Choice Friday'];
        expect(component.find(TableHeader).props().tableColumnNamesOrderedFromLeftToRight).toEqual(expected);
    })

    it('should pass a submission as a prop to the submission row', () => {
        expect(component.find(TableRow).at(0).props().flattenedDataToDisplay).toEqual(submission);
    });

});