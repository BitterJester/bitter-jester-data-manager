import React from 'react';
import { Col, Row } from 'reactstrap';
import _ from 'lodash';

type Props = {
    columns: number;
    gridItems: any[];
}

const NByMGrid = (props: Props) => {
    const { columns, gridItems } = props;
    const rows = [];
    const gridItemsCopy = _.cloneDeep(gridItems);

    while (gridItemsCopy.length > 0) {
        const numberOfItemsToRemove = columns < gridItemsCopy.length ? columns : gridItemsCopy.length;
        const itemsForRow = gridItemsCopy.splice(0, numberOfItemsToRemove);
        const row = [];

        itemsForRow.forEach((gridItem, index) => {
            row.push(<Col key={index} style={{padding: '8px'}}>{gridItem}</Col>)
        });
        rows.push(<Row key={rows.length}>{row}</Row>);
    }

    return (
        <div>{rows}</div>
    );
};

export default NByMGrid;