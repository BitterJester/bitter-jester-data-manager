import React from 'react';
import {shallow} from 'enzyme';
import App from './App';

describe('App', () => {
    const component = shallow(<App />);
    it('should load a title', () => {
        expect(component.find('h1').text()).toEqual('Bitter Jester Data Manager');
    });
});