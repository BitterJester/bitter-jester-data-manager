import React from 'react';
import { SubmissionTable } from './SubmissionTable';
import { shallow } from 'enzyme';
import { Submission } from '../Pages/Submissions/Submissions';

describe('SubmissionTable', () => {
    const mockSubmissions: Submission[] = [];
    const component = shallow(<SubmissionTable submissions={mockSubmissions}/>);

    it('should render a div', () => {
        expect(component.find('div')).toHaveLength(1);
    });
});