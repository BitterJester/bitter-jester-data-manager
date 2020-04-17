import React from 'react';

import '../../static/completedSubmissionCard.css';
import CardContainer from '../Cards/CardContainer';
import { Row } from 'reactstrap';
import CardItem from '../Cards/CardItem';
import { BitterJesterApplication } from '../../Pages/Submissions/Submissions';

type Props = {
    completedSubmission: BitterJesterApplication;
}

const CompletedSubmissionCard = (props: Props) => {
    const {
        bandName,
        primaryEmailAddress,
        firstChoiceFridayNight,
        secondChoiceFridayNight,
        primaryPhoneNumber,
        citiesRepresented,
        referencedBands
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
            <Row>
                <div className={'references'}>
                    <CardItem label={'References'} value={referencedBands} />
                </div>
            </Row>
        </CardContainer>
    );
};

export default CompletedSubmissionCard;