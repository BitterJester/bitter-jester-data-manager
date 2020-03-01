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
                tableColumnNamesOrderedFromLeftToRight.map((columnName, index) => {
                    return (
                        <Col key={index} className={'tableHeaderContent'}>
                            {columnName}
                        </Col>
                    );
                })
            }
        </Row>
    );
}