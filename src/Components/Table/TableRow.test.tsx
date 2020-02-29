import React from 'react';
import { shallow } from 'enzyme';
import { TableRow } from './TableRow';
import { TableColumn } from './TableColumn';

describe('Table Row', () => {
    const item = {
        value1: 'value1',
        value2: 'value2'
    }

    const component = shallow(<TableRow flattenedDataToDisplay={item} key={'1'} />);
    console.log(component.find('td'))
    it('should render a table row', () => {
        expect(component.find('tr')).toHaveLength(1);
    });

    it('should display item1', () => {
        expect(component.find(TableColumn)).toHaveLength(2);
    });

    it('should pass value1 to table column', () => {
        expect(component.find(TableColumn).at(0).props().displayText).toEqual('"value1"');
    });

    it('should pass value2 to table column', () => {
        expect(component.find(TableColumn).at(1).props().displayText).toEqual('"value2"');
    });
});