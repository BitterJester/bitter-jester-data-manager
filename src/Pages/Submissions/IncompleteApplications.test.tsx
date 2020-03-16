import React from 'react';
import { shallow } from 'enzyme';
import { IncompleteApplications } from './IncompleteApplications';

describe('IncompleteApplications page', () => {
    const component = shallow(<IncompleteApplications />);

    it('should render a div', () => {
        expect(component.find('div')).toBeDefined();
    });
});