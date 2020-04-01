import React from 'react';
import { SubmissionContainer } from '../../Containers/SubmissionContainer';
import { ScheduleContainer } from '../../Containers/ScheduleContainer';

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
    primaryPhoneNumber: string;
    citiesRepresented: string;
}


export const Submissions = () => {
    return (
        <div style={{background: '#e8e7e4'}}>
            <ScheduleContainer />
            <SubmissionContainer />
        </div>
    );
}