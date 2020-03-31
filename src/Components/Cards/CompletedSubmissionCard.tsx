import React from 'react';

import '../../static/completedSubmissionCard.css';
import { PrunedApplication } from '../../Containers/SubmissionContainer';
import CardContainer from '../CardContainer';
import { Row, Col } from 'reactstrap';
import CardItem from './CardItem';

type Props = {
    completedSubmission: PrunedApplication;
}

const CompletedSubmissionCard = (props: Props) => {
    const { completedSubmission } = props;

    const secondChoiceFridayLabel = completedSubmission.secondChoiceFridayNight !== '' ? 'Second Choice Friday Night' : '';

    return (
        <CardContainer className={'completedSubmissionCardContainer'}>
            <Row>
                <div className={'bandName'}>
                    {completedSubmission.bandName}
                </div>
            </Row>
            <Row className={'leftSide'}>
                <CardItem label={'First Choice Friday Night'} value={completedSubmission.firstChoiceFridayNight} />
                <CardItem label={'Primary Email Address'} value={completedSubmission.primaryEmailAddress} />
            </Row>
            <Row className={'rightSide'}>
                <CardItem label={secondChoiceFridayLabel} value={completedSubmission.secondChoiceFridayNight} />
                <Col></Col>
            </Row>
        </CardContainer>
    );
};

export default CompletedSubmissionCard;