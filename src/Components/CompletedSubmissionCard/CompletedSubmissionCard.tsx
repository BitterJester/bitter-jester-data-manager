import React from 'react';
import CardContainer from '../CardContainer';
import { PrunedApplication } from '../../Containers/SubmissionContainer';
import { Row } from 'reactstrap';

type Props = {
    completedSubmission: PrunedApplication;
}

const CompletedSubmissionCard = (props: Props) => {
    const { completedSubmission } = props;

    return (
        <CardContainer>
            <Row><span>Band Name: {completedSubmission.bandName}</span></Row>
            <Row><span>Primary Email Address: {completedSubmission.primaryEmailAddress}</span></Row>
            <Row><span>First Choice Friday Night: {completedSubmission.firstChoiceFridayNight}</span></Row>
            <Row><span>Second Choice Friday Night: {completedSubmission.secondChoiceFridayNight}</span></Row>
        </CardContainer>
    );
};

export default CompletedSubmissionCard;