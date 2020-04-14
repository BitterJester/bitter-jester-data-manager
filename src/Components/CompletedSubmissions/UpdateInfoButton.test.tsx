import React from 'react';
import { shallow } from 'enzyme';
import { UpdateInfoButton } from './UpdateInfoButton';
import { Alert, Button } from 'reactstrap';

describe('UpdateInfoButton', () => {
    const component = shallow(<UpdateInfoButton />);

    it('should render an alert with a default isOpen of false', () => {
        expect(component.find(Alert).props().isOpen).toEqual(false);
    });

    it('should render a Button', () => {
        expect(component.find(Button).childAt(0).text()).toEqual('Update Submissions in Background')
    });

    describe('Click button', () => {
        it('should have tests for this', () => {
            expect(true).toEqual(true);
        });
    });
});