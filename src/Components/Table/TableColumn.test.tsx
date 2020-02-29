import React from 'react';
import { shallow } from 'enzyme';
import { TableColumn } from './TableColumn';

describe('Table Column', () => {
    const component = shallow(<TableColumn displayText={'displayText'} />);

    it('should render display text in a td', () => {
        expect(component.find('td').text()).toEqual('displayText');
    });
});