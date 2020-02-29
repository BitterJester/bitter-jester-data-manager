import React from 'react';
import { shallow } from 'enzyme';
import { TableHeader } from './TableHeader';

describe('TableHeader', () => {
    const tableColumnNamesOrderedFromLeftToRight: string[] = [
        'column1'
    ];

    const component = shallow(
        <TableHeader tableColumnNamesOrderedFromLeftToRight={tableColumnNamesOrderedFromLeftToRight} />
    );

    it('should render a th', () => {
        expect(component.find('th')).toHaveLength(1);
    });

    it('should render a td for column1', () => {
        expect(component.find('td').text()).toEqual('column1');
    });
});