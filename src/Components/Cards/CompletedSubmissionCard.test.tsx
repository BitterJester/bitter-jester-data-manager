import React from 'react';
import { shallow } from 'enzyme';
import CompletedSubmissionCard from './CompletedSubmissionCard';
import { PrunedApplication } from '../../Containers/SubmissionContainer';
import CardContainer from '../CardContainer';
import CardItem from './CardItem';
import { Col } from 'reactstrap';

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

    const getCardItemProps = (index: number) => {
        return component.find(CardItem).at(index).props();
    }

    it('should display a row for primary email address', () => {
        expect(getCardItemProps(1).value).toEqual('email');
    });

    it('should display a row for first choice friday night', () => {
        expect(getCardItemProps(0).value).toEqual('1');
    });

    it('should display a row for second choice friday night', () => {
        expect(getCardItemProps(2).value).toEqual('2');
    });
});

describe('CompletedSubmissionCard - optional values not sent', () => {
    const completedSubmission: PrunedApplication = {
        bandName: 'band1',
        primaryEmailAddress: 'email',
        firstChoiceFridayNight: 'Available Every Friday',
        secondChoiceFridayNight: ''
    };

    const component = shallow(<CompletedSubmissionCard completedSubmission={completedSubmission} />);

    const getCardItemProps = (index: number) => {
        return component.find(CardItem).at(index).props();
    }

    it('should display a row for first choice friday night', () => {
        expect(getCardItemProps(0).value).toEqual('Available Every Friday');
    });

    it('should display an empty row for second choice friday night', () => {
        expect(component.find(Col)).toHaveLength(1);
    });
});