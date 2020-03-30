import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import _ from 'lodash';
import { start } from 'repl';

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

        itemsForRow.forEach(gridItem => {
            row.push(<Col>{gridItem}</Col>)
        });
        rows.push(<Row>{row}</Row>);
    }

    return (
        <Container>
            {rows}
        </Container>
    );
};

export default NByMGrid;