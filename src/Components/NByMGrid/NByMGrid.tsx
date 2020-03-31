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
        const isEnoughToFillRow = columns < gridItemsCopy.length;
        const numberOfItemsToRemove = isEnoughToFillRow ? columns : gridItemsCopy.length;
        const itemsForRow = gridItemsCopy.splice(0, numberOfItemsToRemove);
        const row = [];

        itemsForRow.forEach((gridItem, index) => {
            row.push(<Col key={index} style={{padding: '24px'}}>{gridItem}</Col>)
        });

        const addEmptyColumnssToFillLastRow = () => {
            for(let i = 0; i < columns - numberOfItemsToRemove; i++){
                row.push(<Col style={{padding: '24px'}} key={`empty${i}`}></Col>)
            }
        };

        if(!isEnoughToFillRow){
          addEmptyColumnssToFillLastRow();  
        }

        rows.push(<Row key={rows.length}>{row}</Row>);
    }

    return (
        <div>{rows}</div>
    );
};

export default NByMGrid;