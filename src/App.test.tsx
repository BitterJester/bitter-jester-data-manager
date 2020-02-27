import React from 'react';
import {shallow} from 'enzyme';
import App from './App';
import { Title } from './Pages/home/Title';

describe('App', () => {
    const component = shallow(<App />);

    it('should display a title', () => {
        expect(component.find(Title).props().titleDisplayText).toEqual('Bitter Jester Data Manager');
    });
});