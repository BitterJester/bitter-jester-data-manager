import React from 'react';
import { shallow } from 'enzyme';
import { Submissions } from './Submissions';
import { SubmissionContainer } from '../../Containers/SubmissionContainer';
import { Title } from '../../Components/Title';

describe('Submissions page', () => {
    const component = shallow(<Submissions />);


    describe('SubmissionTable', () => {
        it('should render a SubmissionTable', () => {
            expect(component.find(SubmissionContainer)).toBeDefined();
        });
    
        it('should pass submission to the submission table as a prop', () => {
            expect(component.find(SubmissionContainer).props().submissions).toBeDefined();
        });
    });
});