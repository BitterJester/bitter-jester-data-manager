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
                <CardItem label={'Primary Email Address'} value={completedSubmission.primaryEmailAddress} />
                <CardItem label={'First Choice Friday Night'} value={completedSubmission.firstChoiceFridayNight} />
            </Row>
            <Row className={'rightSide'}>
                <CardItem label={'Phone Number'} value={completedSubmission.primaryPhoneNumber} />
                <CardItem label={secondChoiceFridayLabel} value={completedSubmission.secondChoiceFridayNight} />
            </Row>
        </CardContainer>
    );
};

export default CompletedSubmissionCard;