import React, { useState, useEffect } from 'react';
import { getFromS3 } from '../aws/getFromS3';
import { Title } from '../Components/Title';
import IncompleteSubmissionCard from '../Components/Cards/IncompleteSubmissionCard';

type IncompleteApplications = {
    incompleteApplications: IncompleteApplication[];
}

export type IncompleteApplication = {
    applicantName?: {
        first: string;
        last: string;
    };
    bandName?: string;
    primaryEmailAddress?: string;
    relationshipToBand?: string;
};

export const IncompleteApplicationsContainer = () => {
    const initialIncompleteApplications: IncompleteApplications = {
        incompleteApplications: []
    };
    const [incompleteApplications, setIncompleteApplications] = useState(initialIncompleteApplications);

    useEffect(() => {
        async function fetch() {
            await getFromS3('incomplete-applications.json', setIncompleteApplications);
        }
        fetch();
    }, []);

    const sortByBandName = () => {
        return incompleteApplications.incompleteApplications.sort((a, b) => a.bandName < b.bandName ? -1 : 1);
    };

    return (
        <div>
            <Title titleDisplayText='Incomplete Applications'/>
            {
                sortByBandName()
                    .map(app => {
                        return (
                            <IncompleteSubmissionCard incompleteApplication={app}/>
                        );
                    })
            }
        </div>
    );
};