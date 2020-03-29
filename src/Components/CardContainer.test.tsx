import React from 'react';
import { shallow } from 'enzyme';
import CardContainer from './CardContainer';
import { Card } from 'reactstrap';

describe('CardContainer', () => {

    const component = shallow(<CardContainer>{'hi'}</CardContainer>);

    it('should render a card', () => {
        expect(component.find(Card)).toHaveLength(1);
    });

    it('should render the children', () => {
        console.log(component.debug())
        expect(component.find('div').text()).toEqual('hi');
    });
});