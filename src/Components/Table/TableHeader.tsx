import React from 'react';
import { Row, Col } from 'reactstrap';

type Props = {
    tableColumnNamesOrderedFromLeftToRight: string[];
}

export const TableHeader = (props: Props) => {
    const { tableColumnNamesOrderedFromLeftToRight } = props;

    return (
        <Row>
            {
                tableColumnNamesOrderedFromLeftToRight.map(columnName => {
                    return (
                        <Col>
                            {columnName}
                        </Col>
                    );
                })
            }
        </Row>
    );
}