import React from 'react';
import {SubmissionContainer} from '../containers/SubmissionContainer';
import {ScheduleContainer} from '../containers/ScheduleContainer';
import Page from "../Components/Page";

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
    bandMemberAges?: number[];
}


export const Submissions = () => {
    return (
        <Page>
            <ScheduleContainer/>
            <SubmissionContainer/>
        </Page>
    );
}