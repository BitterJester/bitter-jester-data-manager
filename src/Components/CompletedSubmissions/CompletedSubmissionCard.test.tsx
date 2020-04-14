import React from 'react';
import { shallow } from 'enzyme';
import CompletedSubmissionCard from './CompletedSubmissionCard';
import CardContainer from '../Cards/CardContainer';
import CardItem from '../Cards/CardItem';
import { BitterJesterApplication } from '../../Pages/Submissions/Submissions';

describe('CompletedSubmissionCard', () => {
    const completedSubmission: BitterJesterApplication = {
        bandName: 'band1',
        primaryEmailAddress: 'email',
        firstChoiceFridayNight: '1',
        secondChoiceFridayNight: '2',
        primaryPhoneNumber: 'phone',
        citiesRepresented: 'city, state city, state',
        id: 'id',
        isAvailableOnAllFridays: true
    };

    const component = shallow(<CompletedSubmissionCard completedSubmission={completedSubmission}/>);

    it('should render a cardContainer', () => {
        expect(component.find(CardContainer)).toHaveLength(1);
    });

    it('should display a row for band name', () => {
        expect(component.find('.bandName').text()).toEqual('band1');
    });


    it('should display a row for citiesRepresented', () => {
        expect(component.find('.citiesRepresented').text()).toEqual('city, state city, state');
    });

    const getCardItemProps = (index: number) => {
        return component.find(CardItem).at(index).props();
    }

    it('should display a row for primary email address', () => {
        expect(getCardItemProps(0).value).toEqual('email');
    });

    it('should display a row for first choice friday night', () => {
        expect(getCardItemProps(1).value).toEqual('1');
    });

    it('should display a row for second choice friday night', () => {
        expect(getCardItemProps(3).value).toEqual('2');
    });

    it('should display a column for primary phone number', () => {
        expect(getCardItemProps(2).value).toEqual('phone');
    });
});