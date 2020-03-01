import React from 'react';
import { Row, Col } from 'reactstrap';
import '../../static/tableRow.css';

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
                    console.log(JSON.stringify(flattenedDataToDisplay));
                    return (
                        <Col className={'columnContent'} key={value}>
                            {value}
                        </Col>
                    );
                })
            }
        </Row>
    );
}