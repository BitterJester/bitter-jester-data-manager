import React from 'react';
import { shallow } from 'enzyme';
import ScheduleToolbar from './ScheduleToolbar';
import ScheduleDropdown from './ScheduleDropdown';
import SaveScheduleButton from './SaveScheduleButton';
import { Schedule } from '../Containers/ScheduleContainer';
import UpdateScheduleButton from '../UpdateScheduleButton';

describe('ScheduleToolbar', () => {
    const schedule: Schedule = {
        fridayNightOne: [],
        fridayNightTwo: [],
        fridayNightThree: [],
        fridayNightFour: [],
        nights: [],
        version: 'suggested'        
    };
    const component = shallow(<ScheduleToolbar schedule={schedule} updateSchedule={() => 'foo'}/>);

    it('should render a ScheduleDropdown', () => {
        expect(component.find(ScheduleDropdown)).toHaveLength(1);
    });

    it('should render an updateSCheduleButton', () => {
        expect(component.find(UpdateScheduleButton)).toHaveLength(1);
    });

    it('shoul=d not render a save schedule button', () => {
        expect(component.find(SaveScheduleButton)).toHaveLength(0);
    })
});

describe('ScheduleToolbar', () => {
    const schedule: Schedule = {
        fridayNightOne: [],
        fridayNightTwo: [],
        fridayNightThree: [],
        fridayNightFour: [],
        nights: [],
        version: 'Last_version'        
    };
    const component = shallow(<ScheduleToolbar schedule={schedule} updateSchedule={() => 'foo'}/>);
    it('should render a ScheduleDropdown', () => {
        expect(component.find(ScheduleDropdown)).toHaveLength(1);
    });

    it('should render a save Schedule button', () => {
        expect(component.find(SaveScheduleButton)).toHaveLength(1);
    });


    it('should not render an updateSCheduleButton', () => {
        expect(component.find(UpdateScheduleButton)).toHaveLength(0);
    });
})