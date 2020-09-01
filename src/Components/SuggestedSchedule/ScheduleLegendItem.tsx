import React from 'react';
import {Col, Row} from 'reactstrap';
import '../../static/css/scheduleLegend.css';

const ScheduleLegendItem = () => {
    return (
        <Row className={'scheduleLegendContainer'}>
            <Col>
                <div className={'coloredKey'} style={{background: 'darkgreen'}}/>
                <p>Band is scheduled on a first choice night or they don't care.</p>
            </Col>
            <Col>
                <div className={'coloredKey'} style={{background: 'rgb(227, 194, 27)'}}/>
                <p>Band is scheduled on a second choice night.</p>
            </Col>
            <Col>
                <div className={'coloredKey'} style={{background: 'orange'}}/>
                <p>Band is scheduled on a night that wasn't their first or second choice.</p>
            </Col>
            <Col>
                <div className={'coloredKey'} style={{background: 'red'}}/>
                <p>Band is scheduled on a night that they are not available.</p>
            </Col>
        </Row>
    );
};

export default ScheduleLegendItem;