import React from 'react';
import { shallow } from 'enzyme';
import CompletedSubmissionCardsTable from './CompletedSubmissionCardsTable';
import { BitterJesterApplication } from '../../Pages/Submissions/Submissions';
import NByMGrid from '../NByMGrid/NByMGrid';

describe('CompletedSubmissionCardsTable', () => {
    const getBitterJesterApplication = (): BitterJesterApplication => {
        return {
            id: 'id',
            bandName: 'band',
            isAvailableOnAllFridays: true,
            primaryEmailAddress: 'email',
            primaryPhoneNumber: 'phone',
            citiesRepresented: 'cities'
        }
    };
    const component = shallow(<CompletedSubmissionCardsTable completedSubmissions={[getBitterJesterApplication()]}/>);

    it('should do something', () => {
        expect(component.find(NByMGrid).props().gridItems).toHaveLength(1);
    });
});