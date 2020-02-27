import React from 'react';
import { shallow } from 'enzyme';
import { Submissions } from './Submissions';
import { SubmissionTable } from '../../Components/SubmissionTable';
import { Title } from './Title';

describe('Submissions page', () => {
    const component = shallow(<Submissions />);

    it('should display a title', () => {
        expect(component.find(Title).props().titleDisplayText).toEqual('Bitter Jester Data Manager');
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