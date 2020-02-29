import React from 'react';
import { shallow } from 'enzyme';
import { TableHeader } from './TableHeader';
import { Row, Col } from 'reactstrap';

describe('TableHeader', () => {
    const tableColumnNamesOrderedFromLeftToRight: string[] = [
        'column1'
    ];

    const component = shallow(
        <TableHeader tableColumnNamesOrderedFromLeftToRight={tableColumnNamesOrderedFromLeftToRight} />
    );

    it('should render a row as this should always be placed in a container', () => {
        expect(component.find(Row)).toHaveLength(1);
    });

    it('should render a td for column1', () => {
        expect(component.find(Col).childAt(0).text()).toEqual('column1');
    });
});