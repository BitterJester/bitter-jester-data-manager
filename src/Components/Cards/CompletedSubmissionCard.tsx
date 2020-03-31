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
    const { 
        bandName, 
        primaryEmailAddress, 
        firstChoiceFridayNight, 
        secondChoiceFridayNight, 
        primaryPhoneNumber, 
        citiesRepresented 
    } = props.completedSubmission;

    const secondChoiceFridayLabel = secondChoiceFridayNight !== '' ? 'Second Choice Friday Night' : '';

    return (
        <CardContainer className={'completedSubmissionCardContainer'}>
            <Row>
                <div className={'bandName'}>
                    {bandName}
                </div>
            </Row>
            <Row>
                <div className={'citiesRepresented'}>
                    {citiesRepresented}
                </div>
            </Row>
            <Row className={'leftSide'}>
                <CardItem label={'Primary Email Address'} value={primaryEmailAddress} />
                <CardItem label={'First Choice Friday Night'} value={firstChoiceFridayNight} />
            </Row>
            <Row className={'rightSide'}>
                <CardItem label={'Phone Number'} value={primaryPhoneNumber} />
                <CardItem label={secondChoiceFridayLabel} value={secondChoiceFridayNight} />
            </Row>
        </CardContainer>
    );
};

export default CompletedSubmissionCard;