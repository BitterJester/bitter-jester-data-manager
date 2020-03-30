import React from 'react';

import '../../static/completedSubmissionCard.css';
import { PrunedApplication } from '../../Containers/SubmissionContainer';
import CardContainer from '../CardContainer';

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
                <div className={'completedSubmissionItemLabel'}>Primary Email Address: </div>
                <div className={'completedSubmissionItemValue'} >{completedSubmission.primaryEmailAddress}</div>
            </div>
            <div className={'labelValuePair'}>
                <div className={'completedSubmissionItemLabel'}>First Choice Friday Night: </div>
                <div className={'completedSubmissionItemValue'}>{completedSubmission.firstChoiceFridayNight}</div>
            </div>
            <div className={'labelValuePair'}>
                <div className={'completedSubmissionItemLabel'}>Second Choice Friday Night: </div>
                <div className={'completedSubmissionItemValue'}>{completedSubmission.secondChoiceFridayNight}</div>
            </div>
        </CardContainer>
    );
};

export default CompletedSubmissionCard;