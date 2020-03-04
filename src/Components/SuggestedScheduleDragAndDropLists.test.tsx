import React from 'react';
import { shallow } from 'enzyme';
import { Row } from 'reactstrap';
import { SuggestedScheduleDragAndDropLists } from './SuggestedScheduleDragAndDropLists';

describe('SuggestedScheduleDragAndDropLists', () => {
    const component = shallow(<SuggestedScheduleDragAndDropLists applications={[]}/>);

    it('should render a row', () => {
        expect(component.find(Row)).toHaveLength(1);
    })
})