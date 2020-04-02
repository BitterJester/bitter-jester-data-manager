import React, { useState, useEffect } from 'react';
import { Container, Row, Alert } from 'reactstrap';
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

export const LAST_SAVE_VERSION = 'last_saved';

const SUGGESTED_FRIDAY_NIGHT_SCHEDULE = 'friday-night-schedule.json';
const USER_FRIDAY_NIGHT_SCHEDULE = 'user-friday-night-schedule.json';
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
    const [isSaveAlertOpen, setIsSaveAlertOpen] = useState(false);


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

    const onAlert = () => {
        setIsSaveAlertOpen(!isSaveAlertOpen);
    }

    return (
        <Container fluid>
            <div style={{ padding: '16px' }}>
                <CardContainer style={{ padding: '16px' }}>
                    <Alert isOpen={isSaveAlertOpen} toggle={onAlert} style={{ textAlign: 'center' }}>The schedule has been updated!</Alert>
                    <Row>
                        <ScheduleDropdown
                            dropdownItemOnClick={() => fetch(SUGGESTED_FRIDAY_NIGHT_SCHEDULE)}
                            dropdownItemOnClick2={() => fetch(USER_FRIDAY_NIGHT_SCHEDULE)}
                        />
                        <SaveScheduleButton schedule={schedule} onAlert={onAlert} />
                    </Row>
                    <Title titleDisplayText={formatTitle()} />
                    <ScheduleLegendItem />
                    <SuggestedScheduleDragAndDropLists schedule={schedule} updateSchedule={updateSchedule} />
                </CardContainer>
            </div>
        </Container>
    );
}