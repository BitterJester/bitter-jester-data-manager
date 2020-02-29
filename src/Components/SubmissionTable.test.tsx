import React from 'react';
import { SubmissionTable } from './SubmissionTable';
import { shallow } from 'enzyme';
import { Submission } from '../Pages/Submissions/Submissions';
import { TableRow } from './Table/TableRow';
import {Table} from 'reactstrap';
import { TableHeader } from './Table/TableHeader';

describe('SubmissionTable', () => {
    const submission: Submission = {
        id: 'id',
        ip: 'ip',
        answers: {},
        form_id: 'form_id',
        created_at: 'created_at',
        status: 'status',
        new: 'new',
        flag: 'flag',
        notes: 'notes',
        updated_at: 'updated_at'
    }

    const mockSubmissions: Submission[] = [
        submission
    ];
    const component = shallow(<SubmissionTable submissions={mockSubmissions}/>);

    it('should render a table', () => {
        expect(component.find(Table)).toHaveLength(1);
    });

    it('should render a table header', () => {
        expect(component.find(TableHeader)).toHaveLength(1);
    });

    it('should pass submission object keys as column names to table header', () => {
        const expected = ['Band Name', 'Primary Email Address'];
        expect(component.find(TableHeader).props().tableColumnNamesOrderedFromLeftToRight).toEqual(expected);
    })

    it('should pass a submission as a prop to the submission row', () => {
        expect(component.find(TableRow).at(0).props().flattenedDataToDisplay).toEqual(submission);
    });

});