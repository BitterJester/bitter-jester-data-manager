import React from 'react';
import {SubmissionContainer} from '../../Containers/SubmissionContainer';
import {ScheduleContainer} from '../../Containers/ScheduleContainer';
import Page from "../../Components/Page";

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
    unavailableFridayNights?: string[];
    referencedBands?: string | undefined;
}


export const Submissions = () => {
    return (
        <Page>
            <ScheduleContainer/>
            <SubmissionContainer/>
        </Page>
    );
}