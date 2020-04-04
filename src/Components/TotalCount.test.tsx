import React from 'react';
import { shallow } from 'enzyme';
import TotalCount from './TotalCount';

describe('TotalCount', () => {
    const component = shallow(<TotalCount count={7}/>);

    it('should display count', () => {
        expect(component.find('.totalCountValue').text()).toEqual('7');
    });
});