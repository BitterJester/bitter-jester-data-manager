import React, {useEffect} from 'react';
import {Container} from 'reactstrap';
import {SuggestedScheduleDragAndDropLists} from '../Components/SuggestedSchedule/SuggestedScheduleDragAndDropLists';
import {BitterJesterApplication} from '../pages/Submissions';
import CardContainer from '../Components/Cards/CardContainer';
import {Title} from '../Components/Title';
import _ from 'lodash';
import ScheduleLegendItem from '../Components/SuggestedSchedule/ScheduleLegendItem';
import ScheduleToolbar from '../Components/SuggestedSchedule/ScheduleToolbar';
import {useSelector} from "react-redux";
import dataManagerReduxStore, {DataManagerReduxStore} from "../redux/data-manager-redux-store";
import {INITIAL_SCHEDULE} from "../redux/reducers/selectedCompetitionReducer";
import {BitterJesterApiScheduleRequest} from "../utils/api-requests/bitter-jester-api-schedule-request";

export type Night = {
    night: number;
    bands: BitterJesterApplication[]
}

export type Schedule = {
    fridayNightOne: BitterJesterApplication[],
    fridayNightTwo: BitterJesterApplication[],
    fridayNightThree: BitterJesterApplication[],
    fridayNightFour: BitterJesterApplication[],
    nights: Night[],
    version: string
}

export const LAST_SAVE_VERSION = 'last_saved';
export const SUGGESTED_VERSION = 'suggested';

export const ScheduleContainer = () => {
    const schedule = useSelector((state: DataManagerReduxStore) => state.selectedCompetition.schedule);
    const {selectedCompetition, competitions} = useSelector((state: DataManagerReduxStore) => {
        return ({competitions: state.appInfo.competitions, selectedCompetition: state.selectedCompetition});
    });

    async function fetch(scheduleType) {
        const scheduleApiRequest = new BitterJesterApiScheduleRequest();
        const updatedSchedule = await scheduleApiRequest.getSchedule(selectedCompetition.id, scheduleType !== SUGGESTED_VERSION);
        dataManagerReduxStore.dispatch({
            type: 'competition/set-schedule',
            payload: {schedule: updatedSchedule ? updatedSchedule : INITIAL_SCHEDULE}
        });
    }

    useEffect(() => {
        if (selectedCompetition.id) {
            fetch(SUGGESTED_VERSION);
        }
    }, [selectedCompetition.id]);

    const updateSchedule = (columnRemovedFromIndex, rowRemovedFromIndex, columnAddedToIndex, rowAddedToIndex) => {
        const scheduleCopy = _.cloneDeep(schedule);
        const nights = scheduleCopy.nights;
        const bandToMove = nights[columnRemovedFromIndex].bands[rowRemovedFromIndex];
        let nightToAddTo = nights[columnAddedToIndex];

        const getNightToRemoveFrom = () => {
            return nights.filter(night => _.isEqual(night.night, nights[columnRemovedFromIndex].night));
        };
        const nightToRemoveFrom = getNightToRemoveFrom();

        const removeBandFromPreviousLocation = () => {
            nightToRemoveFrom[0].bands = nightToRemoveFrom[0].bands.filter((band, index) => {
                return index !== rowRemovedFromIndex;
            });
        };
        removeBandFromPreviousLocation();

        const addBandToNewLocation = () => {
            nightToAddTo.bands.splice(rowAddedToIndex, 0, bandToMove);
        };
        addBandToNewLocation();

        dataManagerReduxStore.dispatch({
            type: 'competition/set-schedule',
            payload: {schedule: scheduleCopy}
        });
    }

    const formatVersionForTitle = (version: string): string => {
        return version.split('_').map(part =>
            part.replace(
                /^./,
                part[0].toUpperCase()
            )
        ).join(' ');
    };

    const formatTitle = (): string => {
        return `${schedule ? formatVersionForTitle(schedule.version) : formatVersionForTitle(SUGGESTED_VERSION)} Friday Night Schedule`;
    }

    return (
        <Container fluid>
            <div style={{padding: '16px'}}>
                <CardContainer style={{padding: '16px'}}>
                    <Title titleDisplayText={formatTitle()}/>
                    <ScheduleToolbar schedule={schedule} updateSchedule={fetch}/>
                    <ScheduleLegendItem/>
                    <SuggestedScheduleDragAndDropLists schedule={schedule} updateSchedule={updateSchedule}/>
                </CardContainer>
            </div>
        </Container>
    );
}