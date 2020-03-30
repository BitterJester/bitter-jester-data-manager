import React from 'react';
import { shallow } from 'enzyme';
import CompletedSubmissionCard from './CompletedSubmissionCard';
import { PrunedApplication } from '../../Containers/SubmissionContainer';
import CardContainer from '../CardContainer';

describe('CompletedSubmissionCard', () => {
    const completedSubmission: PrunedApplication = {
        bandName: 'band1',
        primaryEmailAddress: 'email',
        firstChoiceFridayNight: '1',
        secondChoiceFridayNight: '2'
    };

    const component = shallow(<CompletedSubmissionCard completedSubmission={completedSubmission}/>);

    it('should render a cardContainer', () => {
        expect(component.find(CardContainer)).toHaveLength(1);
    });

    it('should display a row for band name', () => {
        expect(component.find('.bandName').text()).toEqual('band1');
    });

    it('should display a row for primary email address', () => {
        expect(component.find('.completedSubmissionItemValue').at(0).text()).toEqual('email');
    });

    it('should display a row for first choice friday night', () => {
        expect(component.find('.completedSubmissionItemValue').at(1).text()).toEqual('1');
    });

    it('should display a row for second choice friday night', () => {
        expect(component.find('.completedSubmissionItemValue').at(2).text()).toEqual('2');
    });
});