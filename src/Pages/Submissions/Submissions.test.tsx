import React from 'react';
import { shallow } from 'enzyme';
import { Submissions } from './Submissions';
import { SubmissionContainer } from '../../Containers/SubmissionContainer';

describe('Submissions page', () => {
    const component = shallow(<Submissions />);


    describe('SubmissionTable', () => {
        it('should render a SubmissionTable', () => {
            expect(component.find(SubmissionContainer)).toBeDefined();
        });
    });
});