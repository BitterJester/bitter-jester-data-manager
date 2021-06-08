import React from 'react';
import { shallow } from 'enzyme';
import ScheduleToolbar from './ScheduleToolbar';
import ScheduleDropdown from './ScheduleDropdown';
import SaveScheduleButton from './SaveScheduleButton';
import { Schedule } from '../../containers/ScheduleContainer';
import TotalCount from '../TotalCount';

describe('ScheduleToolbar', () => {
    const schedule: Schedule = {
        fridayNightOne: [],
        fridayNightTwo: [],
        fridayNightThree: [],
        fridayNightFour: [],
        nights: [],
        version: 'suggested'
    };
    const component = shallow(<ScheduleToolbar schedule={schedule} updateSchedule={() => 'foo'} />);

    it('should render a ScheduleDropdown', () => {
        expect(component.find(ScheduleDropdown)).toHaveLength(1);
    });

    it('should render a save schedule button', () => {
        expect(component.find(SaveScheduleButton)).toHaveLength(1);
    })

    it('should pass count of bands to totalCount', () => {
        expect(component.find(TotalCount).props().count).toEqual(0);
    });
});