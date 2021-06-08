import React from 'react';
import { shallow } from 'enzyme';

describe('SubmissionTable', () => {
    const component = shallow(<div />);

    it('should have tests', () => {
        expect(component.find('div')).toBeDefined();
    });
});