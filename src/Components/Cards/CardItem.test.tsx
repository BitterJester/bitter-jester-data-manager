import React from 'react';
import CardItem from './CardItem';
import { shallow } from 'enzyme';
import { Col } from 'reactstrap';

describe('CardItem', () => {
    const component = shallow(<CardItem label={'aLabel'} value={'aValue'}/>);

    it('should render a col', () => {
        expect(component.find(Col)).toHaveLength(1);
    });

    it('should render a label name', () => {
        expect(component.find('.cardItemLabel').text()).toEqual('aLabel');
    });

    it('should render a value', () => {
        expect(component.find('.cardItemValue').text()).toEqual('aValue');
    });
});