import React from 'react';
import {Col, Row} from 'reactstrap';
import '../../static/css/scheduleLegend.css';
import GradeIcon from "@material-ui/icons/Grade";

const ScheduleLegendItem = () => {
    return (
        <Row className={'scheduleLegendContainer'}>
            <Col className={'legend-item'}>
                <div className={'coloredKey'} style={{background: 'darkgreen'}}/>
                <p className={'legend-item-text'}>Band is scheduled on a first choice night or they don't care.</p>
            </Col>
            <Col className={'legend-item'}>
                <div className={'coloredKey'} style={{background: 'rgb(227, 194, 27)'}}/>
                <p className={'legend-item-text'}>Band is scheduled on a second choice night.</p>
            </Col>
            <Col className={'legend-item'}>
                <div className={'coloredKey'} style={{background: 'orange'}}/>
                <p className={'legend-item-text'}>Band is scheduled on a night that wasn't their first or second choice.</p>
            </Col>
            <Col className={'legend-item'}>
                <div className={'coloredKey'} style={{background: 'red'}}/>
                <p className={'legend-item-text'}>Band is scheduled on a night that they are not available.</p>
            </Col>
            <Col className={'legend-item'}>
                <div>
                    <div style={{color: 'rgb(227, 194, 27)'}} className={'coloredKey'}>
                        <GradeIcon/>
                    </div>
                    <p className={'legend-item-text'}>Opening Showcase</p>
                </div>
            </Col>
            <Col className={'legend-item'}>
                <div>
                    <div style={{color: 'blue'}} className={'coloredKey'}>
                        <GradeIcon/>
                    </div>
                    <p className={'legend-item-text'}>Closing Showcase</p>
                </div>
            </Col>
            <Col className={'legend-item'}>
                <div>
                    <div style={{color: 'purple'}} className={'coloredKey'}>
                        <GradeIcon/>
                    </div>
                    <p className={'legend-item-text'}>Guest Artist</p>
                </div>
            </Col>
        </Row>
    );
};

export default ScheduleLegendItem;