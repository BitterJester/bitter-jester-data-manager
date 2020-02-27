import React from 'react';
import { shallow } from 'enzyme';
import { Title } from './Title';

describe('Title', () => {
    const component = shallow(<Title titleDisplayText={'title'}/>);
    it('should load an h1', () => {
        expect(component.find('h1').text()).toEqual('title');
    });
});