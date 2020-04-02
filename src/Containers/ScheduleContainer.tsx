import React, { useState, useEffect } from 'react';
import { Container, Row } from 'reactstrap';
import { SuggestedScheduleDragAndDropLists } from '../Components/SuggestedScheduleDragAndDropLists';
import { getFromS3 } from '../aws/getFromS3';
import { BitterJesterApplication } from '../Pages/Submissions/Submissions';
import CardContainer from '../Components/CardContainer';
import { Title } from '../Components/Title';
import _ from 'lodash';
import ScheduleLegendItem from '../Components/ScheduleLegendItem';
import ScheduleDropdown from '../Components/ScheduleDropdown';
import SaveScheduleButton from '../Components/SaveScheduleButton';

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

export const USER_SAVE_VERSION = 'user_saved';

const SUGGESTED_FRIDAY_NIGHT_SCHEDULE = 'friday-night-schedule.json';
const USER_FRIDAY_NIGHT_SCHEDULE = 'user-friday-night-schedule.json';
export const ScheduleContainer = () => {
    const initialSchedule: Schedule = {
        fridayNightOne: [],
        fridayNightTwo: [],
        fridayNightThree: [],
        fridayNightFour: [],
        nights: [],
        version: USER_SAVE_VERSION
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
        nightToAddTo.bands.splice(rowAddedToIndex, 0, bandToMove);
        const nightToRemoveFrom = nights.filter(night => {
            const isNightToRemoveFrom = _.isEqual(night.night, nights[columnRemovedFromIndex].night);
            return isNightToRemoveFrom;
        });
        nightToRemoveFrom[0].bands = nightToRemoveFrom[0].bands.filter((band, index) => {
            return index !== rowRemovedFromIndex;
        });
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
        return `${schedule ? formatVersionForTitle(schedule.version) : 'Suggested'} Friday Night Schedule`;
    }

    return (
        <Container fluid>
            <div style={{ padding: '16px' }}>
                <CardContainer>
                    <Row>
                        <ScheduleDropdown
                            dropdownItemOnClick={() => fetch(SUGGESTED_FRIDAY_NIGHT_SCHEDULE)}
                            dropdownItemOnClick2={() => fetch(USER_FRIDAY_NIGHT_SCHEDULE)}
                        />
                        <SaveScheduleButton schedule={schedule} />
                    </Row>
                    <Title titleDisplayText={formatTitle()} />
                    <ScheduleLegendItem />
                    <SuggestedScheduleDragAndDropLists schedule={schedule} updateSchedule={updateSchedule} />
                </CardContainer>
            </div>
        </Container>
    );
}