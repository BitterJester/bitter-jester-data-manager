import React from 'react';
import { shallow } from 'enzyme';
import ScheduleLegendItem from './ScheduleLegendItem';

describe('ScheduleLegend', () => {
    const component = shallow(<ScheduleLegendItem />);

    it('should render a row for green', () => {
        expect(component.find('.scheduleLegendContainer')).toHaveLength(1);
    });
});