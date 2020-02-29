import React from 'react';
import { Row, Col } from 'reactstrap';

type Props = {
    flattenedDataToDisplay: object;
    key: string;
}

export const TableRow = (props: Props) => {
    const { flattenedDataToDisplay } = props;

    return (
        <Row>
            {
                Object.values(flattenedDataToDisplay).map(value => {
                    return (
                        <Col key={value}>
                            {value}
                        </Col>
                    );
                })
            }
        </Row>
    );
}