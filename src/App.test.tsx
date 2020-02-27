import React from 'react';
import {shallow} from 'enzyme';
import App from './App';
import { Submissions } from './Pages/Submissions/Submissions';

describe('App', () => {
    const component = shallow(<App />);

    it('should render the Submissions page', () => {
        expect(component.find(Submissions)).toBeDefined();
    })

    
});