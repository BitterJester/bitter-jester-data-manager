import React from 'react';

import '../../static/completedSubmissionCard.css';
import { PrunedApplication } from '../../Containers/SubmissionContainer';
import CardContainer from '../CardContainer';
import { Row, Col } from 'reactstrap';

type Props = {
    completedSubmission: PrunedApplication;
}

const CompletedSubmissionCard = (props: Props) => {
    const { completedSubmission } = props;

    return (
        <CardContainer className={'completedSubmissionCardContainer'}>
            <Row>
                <div className={'bandName'}>
                    {completedSubmission.bandName}
                </div>
            </Row>
            <Row className={'leftSide'}>
                <Col>
                    <div className={'completedSubmissionItemLabel'}>Primary Email Address</div>
                    <div className={'completedSubmissionItemValue'} >{completedSubmission.primaryEmailAddress}</div>
                </Col>
                <Col>
                    <div className={'completedSubmissionItemLabel'}>First Choice Friday Night</div>
                    <div className={'completedSubmissionItemValue'}>{completedSubmission.firstChoiceFridayNight}</div>
                </Col>
            </Row>
            <Row className={'rightSide'}>
                <Col>
                    <div className={'completedSubmissionItemLabel'}>{completedSubmission.secondChoiceFridayNight !== '' ? 'Second Choice Friday Night' : ''}</div>
                    <div className={'completedSubmissionItemValue'}>{completedSubmission.secondChoiceFridayNight}</div>
                </Col>
                <Col></Col>
            </Row>
        </CardContainer>
    );
};

export default CompletedSubmissionCard;