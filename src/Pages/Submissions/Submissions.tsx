import React, { useState, useEffect } from 'react';
import { getFromS3 } from '../../s3/getFromS3';
import { SubmissionContainer } from '../../Containers/SubmissionContainer';

export type BitterJesterApplications = {
    completedApplications?: BitterJesterApplication[];
}

export type BitterJesterApplication = {
    id: string;
    bandName: string;
    primaryEmailAddress: string;
    firstChoiceFridayNight?: string;
    secondChoiceFridayNight?: string;
    isAvailableOnAllFridays: boolean;
}

export const Submissions = () => {
    const initialSubmissions: BitterJesterApplications = {};
    const [submissions, setSubmissions] = useState(initialSubmissions);

    useEffect(() => {
        async function fetch() {
            await getFromS3(setSubmissions);
        }
        fetch();
    }, []);

    return (
        <div>
            
            <SubmissionContainer submissions={submissions} />
        </div>
    );
}