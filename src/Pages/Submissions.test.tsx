import React from 'react';
import { shallow } from 'enzyme';
import { Submissions } from './Submissions';
import { SubmissionContainer } from '../Containers/SubmissionContainer';
import { UpdateInfoButton } from '../Components/CompletedSubmissions/UpdateInfoButton';
import { ScheduleContainer } from '../Containers/ScheduleContainer';

describe('Submissions page', () => {
    const component = shallow(<Submissions />);

    it('should render a SubmissionContainer', () => {
        expect(component.find(SubmissionContainer)).toBeDefined();
    });

    it('should render an UpdateInfoButton', () => {
        expect(component.find(UpdateInfoButton)).toBeDefined();
    });

    it('should render a ScheduleContainer', () => {
        expect(component.find(ScheduleContainer)).toBeDefined();
    });
});