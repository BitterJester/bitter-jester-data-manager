import React from 'react';
import { SubmissionTable } from './SubmissionTable';
import { shallow } from 'enzyme';
import { Submission } from '../Pages/Submissions/Submissions';
import { SubmissionRow } from './SubmissionRow';

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

    const firstSubmissionRow = component.find(SubmissionRow).at(0);
    it('should pass a submission as a prop to the submission row', () => {
        expect(firstSubmissionRow.props().submission).toEqual(submission);
    });
});