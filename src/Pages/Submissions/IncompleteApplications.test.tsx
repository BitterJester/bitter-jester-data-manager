import React from 'react';
import { shallow } from 'enzyme';
import { IncompleteApplications } from './IncompleteApplications';
import { IncompleteApplicationsContainer } from '../../Containers/IncompleteApplicationsContainer';

describe('IncompleteApplications page', () => {
    const component = shallow(<IncompleteApplications />);

    it('should render an IncompleteApplicationsContainer', () => {
        expect(component.find(IncompleteApplicationsContainer)).toBeDefined();
    });
});