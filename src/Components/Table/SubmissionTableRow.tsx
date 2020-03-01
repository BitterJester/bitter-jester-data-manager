import React from 'react';
import { Row, Col } from 'reactstrap';
import '../../static/tableRow.css';
import { DragDropContext } from 'react-beautiful-dnd';

type Props = {
    flattenedDataToDisplay: object;
    key: React.Component | string;
}

export const SubmissionTableRow = (props: Props) => {
    const { flattenedDataToDisplay } = props;

    return (
        <Row>
            <DragDropContext onDragEnd={() => null}>
            {
                Object.values(flattenedDataToDisplay).map(value => {
                    return (
                        <Col className={'columnContent'} key={value}>
                            {value}
                        </Col>
                    );
                })
            }
            </DragDropContext>
        </Row>
    );
}