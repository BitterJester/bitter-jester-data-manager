import React, {useEffect, useState} from 'react';
import {Container} from 'reactstrap';
import {SuggestedScheduleDragAndDropLists} from '../Components/SuggestedSchedule/SuggestedScheduleDragAndDropLists';
import {getFromS3} from '../aws/getFromS3';
import {BitterJesterApplication} from '../pages/Submissions';
import CardContainer from '../Components/Cards/CardContainer';
import {Title} from '../Components/Title';
import _ from 'lodash';
import ScheduleLegendItem from '../Components/SuggestedSchedule/ScheduleLegendItem';
import ScheduleToolbar from '../Components/SuggestedSchedule/ScheduleToolbar';

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
export const SUGGESTED_FRIDAY_NIGHT_SCHEDULE = 'friday-night-schedule.json';
export const SUGGESTED_VERSION = 'Suggested';

export const ScheduleContainer = () => {
    const initialSchedule: Schedule = {
        fridayNightOne: [],
        fridayNightTwo: [],
        fridayNightThree: [],
        fridayNightFour: [],
        nights: [],
        version: LAST_SAVE_VERSION
    };
    const [schedule, setSchedule] = useState(initialSchedule);

    async function fetch(fileName) {
        await getFromS3(fileName, setSchedule);
    }

    useEffect(() => {
        fetch(SUGGESTED_FRIDAY_NIGHT_SCHEDULE);
    }, []);

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

        setSchedule(scheduleCopy);
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
        return `${schedule ? formatVersionForTitle(schedule.version) : SUGGESTED_VERSION} Friday Night Schedule`;
    }

    return (
        <Container fluid>
            <div style={{ padding: '16px' }}>
                <CardContainer style={{ padding: '16px' }}>
                    <Title titleDisplayText={formatTitle()} />
                    <ScheduleToolbar schedule={schedule} updateSchedule={fetch} />
                    <ScheduleLegendItem />
                    <SuggestedScheduleDragAndDropLists schedule={schedule} updateSchedule={updateSchedule}/>
                </CardContainer>
            </div>
        </Container>
    );
}