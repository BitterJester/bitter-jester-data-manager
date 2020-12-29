import React, { Fragment } from 'react';
import NByMGrid from '../NByMGrid/NByMGrid';
import { BitterJesterApplication } from '../../Pages/Submissions';
import CompletedSubmissionCard from './CompletedSubmissionCard';

type Props = {
    completedSubmissions: BitterJesterApplication[];
}

const CompletedSubmissionCardsTable = (props: Props) => {
    const completedSubmissionCards = props.completedSubmissions.map((submission, index) => {
        return <CompletedSubmissionCard key={index} completedSubmission={submission} />
    });

    return (
        <Fragment>
            <NByMGrid columns={2} gridItems={completedSubmissionCards} />
        </Fragment>
    );
};

export default CompletedSubmissionCardsTable;