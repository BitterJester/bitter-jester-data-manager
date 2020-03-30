import React from 'react';
import CardContainer from '../CardContainer';
import { PrunedApplication } from '../../Containers/SubmissionContainer';
import '../../static/completedSubmissionCard.css';

type Props = {
    completedSubmission: PrunedApplication;
}

const CompletedSubmissionCard = (props: Props) => {
    const { completedSubmission } = props;

    return (
        <CardContainer className={'completedSubmissionCardContainer'}>
            <div className={'bandName'}>
                {completedSubmission.bandName}
            </div>
            <div className={'labelValuePair'}>
                <span className={'completedSubmissionItemLabel'}>Primary Email Address: </span>
                <span className={'completedSubmissionItemValue'} >{completedSubmission.primaryEmailAddress}</span>
            </div>
            <div className={'labelValuePair'}>
                <span className={'completedSubmissionItemLabel'}>First Choice Friday Night: </span>
                <span className={'completedSubmissionItemValue'}>{completedSubmission.firstChoiceFridayNight}</span>
            </div>
            <div className={'labelValuePair'}>
                <span className={'completedSubmissionItemLabel'}>Second Choice Friday Night: </span>
                <span className={'completedSubmissionItemValue'}>{completedSubmission.secondChoiceFridayNight}</span>
            </div>
        </CardContainer>
    );
};

export default CompletedSubmissionCard;