import React from 'react';
import { shallow } from 'enzyme';
import { SubmissionTableRow } from './SubmissionTableRow';
import { Row, Col } from 'reactstrap';

describe('Table Row', () => {
    const item = ['value1', 'value2'];

    const component = shallow(<SubmissionTableRow flattenedDataToDisplay={item} key={'1'} />);
    
    it('should render a row', () => {
        expect(component.find(Row)).toHaveLength(1);
    });

    it('should display item1', () => {
        expect(component.find(Col)).toHaveLength(2);
    });

    it('should pass value1 to table column', () => {
        expect(component.find(Col).at(0).childAt(0).text()).toEqual('value1');
    });

    it('should pass value2 to table column', () => {
        expect(component.find(Col).at(1).childAt(0).text()).toEqual('value2');
    });
});