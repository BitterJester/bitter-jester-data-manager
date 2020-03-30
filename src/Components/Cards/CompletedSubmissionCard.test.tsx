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

    const getRowText = (outerDivIndex: number, innerDivIndex: number) => {
        return component.find('.labelValuePair').at(outerDivIndex).find('div').at(innerDivIndex).text();
    }

    it('should display a row for band name', () => {
        expect(component.find('.bandName').text()).toEqual('band1');
    });

    it('should display a row for primary email address', () => {
        expect(getRowText(0, 0)).toEqual('Primary Email Address: email');
    });

    it('should display a row for first choice friday night', () => {
        expect(getRowText(1, 0)).toEqual('First Choice Friday Night: 1');
    });

    it('should display a row for second choice friday night', () => {
        expect(getRowText(2, 0)).toEqual('Second Choice Friday Night: 2');
    });
});