import React, { Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import '../../static/tableRow.css';

type Props = {
    flattenedDataToDisplay: any[];
    key: string | number;
}

export const SubmissionTableRow = (props: Props) => {
    const { flattenedDataToDisplay } = props;

    return (
        <Row>
            {
                flattenedDataToDisplay.map((value, index) => {
                    return (
                        <Fragment key={index}>
                            <Col className={'columnContent'}>
                                {value}
                            </Col>
                        </Fragment>
                    );
                })
            }
        </Row>
    );
}