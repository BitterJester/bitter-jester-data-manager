import React from 'react';
import { Row, Col } from 'reactstrap';
import '../../static/tableHeader.css';

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
                        <Col className={'tableHeaderContent'}>
                            {columnName}
                        </Col>
                    );
                })
            }
        </Row>
    );
}