import React from 'react';
import { shallow } from 'enzyme';
import { Submissions } from './Submissions';
import { SubmissionContainer } from '../containers/SubmissionContainer';
import { ScheduleContainer } from '../containers/ScheduleContainer';

describe('Submissions page', () => {
    const component = shallow(<Submissions />);

    it('should render a SubmissionContainer', () => {
        expect(component.find(SubmissionContainer)).toBeDefined();
    });

    it('should render a ScheduleContainer', () => {
        expect(component.find(ScheduleContainer)).toBeDefined();
    });
});