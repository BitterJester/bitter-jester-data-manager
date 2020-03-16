import React from 'react';
import { shallow } from 'enzyme';
import { Sidebar } from './Components/Sidebar';

describe('Sidebar', () => {
    const component = shallow(<Sidebar />);

    it('should render a link to close nav bar', () => {
        expect(component.find('a').at(0).props().href).toEqual('javascript:void(0)');
    });

    it('should render a link to completed submissions', () => {
        expect(component.find('a').at(1).props().href).toEqual('/completedSubmissions');
    });
});