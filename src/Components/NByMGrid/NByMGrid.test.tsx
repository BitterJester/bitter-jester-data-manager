import React from 'react';
import { shallow } from 'enzyme';
import NByMGrid from './NByMGrid';
import { Row, Col } from 'reactstrap';

describe('NByMGrid', () => {
    const gridItems = [
        <div>1</div>,
        <div>2</div>,
        <div>3</div>,
        <div>4</div>
    ]
    const component = shallow(<NByMGrid columns={3} gridItems={gridItems} />);

    const getGridItem = (row: number, column: number) => {
        return component.find(Row).at(row).find(Col).at(column).find('div').text();
    }

    it('should have 3 columns in the first row', () => {
        expect(component.find(Row).at(0).find(Col)).toHaveLength(3);
    });

    it('should have 1 column in the second row', () => {
        expect(component.find(Row).at(1).find(Col)).toHaveLength(3);
    });

    it('should have item 1 in first row', () => {
        expect(getGridItem(0, 0)).toEqual('1');
    });

    it('should have item 2 in first row', () => {
        expect(getGridItem(0, 1)).toEqual('2');
    });

    it('should have item 3 in first row', () => {
        expect(getGridItem(0, 2)).toEqual('3');
    });

    it('should have item 4 in second row', () => {
        expect(getGridItem(1, 0)).toEqual('4');
    });

    it('should have item 5 in second row to fill space', () => {
        expect(component.find(Row).at(1).find(Col).at(1)).toHaveLength(1);
    });

    it('should have item 6 in second row to fill space', () => {
        expect(component.find(Row).at(1).find(Col).at(2)).toHaveLength(1);
    });
});