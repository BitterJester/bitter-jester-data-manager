import React from 'react';
import {Col, Row} from 'reactstrap';
import '../../static/css/scheduleLegend.css';
import GradeIcon from "@material-ui/icons/Grade";

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
            <Col>
                <div>
                    <div style={{color: 'rgb(227, 194, 27)'}} className={'coloredKey'}>
                        <GradeIcon/>
                    </div>
                    <p>Opening Showcase</p>
                </div>
            </Col>
            <Col>
                <div>
                    <div style={{color: 'blue'}} className={'coloredKey'}>
                        <GradeIcon/>
                    </div>
                    <p>Closing Showcase</p>
                </div>
            </Col>
            <Col>
                <div>
                    <div style={{color: 'purple'}} className={'coloredKey'}>
                        <GradeIcon/>
                    </div>
                    <p>Guest Artist</p>
                </div>
            </Col>
        </Row>
    );
};

export default ScheduleLegendItem;