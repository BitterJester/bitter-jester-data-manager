import React from 'react';
import { shallow } from 'enzyme';
import CardContainer from '../Cards/CardContainer';
import CardItem from '../Cards/CardItem';
import IncompleteSubmissionCard from './IncompleteSubmissionCard';
import { IncompleteApplication } from '../../Containers/IncompleteApplicationsContainer';

describe('IncompleteSubmissionCard', () => {
    const incompleteApplication: IncompleteApplication = {
        bandName: 'band1',
        primaryEmailAddress: 'email',
        applicantName: {
            first: 'Spencer',
            last: 'Kasper'
        },
        relationshipToBand: 'relationship'
    };

    const component = shallow(<IncompleteSubmissionCard incompleteApplication={incompleteApplication}/>);

    it('should render a cardContainer', () => {
        expect(component.find(CardContainer)).toHaveLength(1);
    });

    it('should display a row for band name', () => {
        expect(component.find('.bandName').text()).toEqual('band1');
    });

    const getCardItemProps = (index: number) => {
        return component.find(CardItem).at(index).props();
    }

    it('should have applicant name', () => {
        expect(getCardItemProps(0).value).toEqual('Spencer Kasper');
    });

    it('should have primary email address', () => {
        expect(getCardItemProps(1).value).toEqual('email');
    });

    it('should have relationship to band', () => {
        expect(getCardItemProps(2).value).toEqual('relationship');
    });
});