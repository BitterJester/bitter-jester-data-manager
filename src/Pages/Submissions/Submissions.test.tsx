import React from 'react';
import { shallow } from 'enzyme';
import { Submissions } from './Submissions';
import { SubmissionTable } from '../../Components/SubmissionTable';
import { Title } from '../../Components/Title';

describe('Submissions page', () => {
    const component = shallow(<Submissions />);

    it('should display a title', () => {
        expect(component.find(Title).props().titleDisplayText).toEqual('Completed Submissions');
    });
    
    describe('SubmissionTable', () => {
        it('should render a SubmissionTable', () => {
            expect(component.find(SubmissionTable)).toBeDefined();
        });
    
        it('should pass submission to the submission table as a prop', () => {
            expect(component.find(SubmissionTable).props().submissions).toBeDefined();
        });
    });
});