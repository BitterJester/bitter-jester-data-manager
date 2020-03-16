import React from 'react';
import { SubmissionContainer } from '../../Containers/SubmissionContainer';
import { ScheduleContainer } from '../../Containers/ScheduleContainer';
import { UpdateInfoButton } from '../../Components/UpdateInfoButton';

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
    return (
        <div>
            <UpdateInfoButton />
            <SubmissionContainer />
            <ScheduleContainer />
        </div>
    );
}