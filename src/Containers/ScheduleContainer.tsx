import React, { useState, useEffect } from 'react';
import { Container, Button, Alert } from 'reactstrap';
import { SuggestedScheduleDragAndDropLists } from '../Components/SuggestedScheduleDragAndDropLists';
import { getFromS3 } from '../aws/getFromS3';
import { BitterJesterApplication } from '../Pages/Submissions/Submissions';
import CardContainer from '../Components/CardContainer';
import { Title } from '../Components/Title';
import { S3Client } from '../aws/s3Client';
import _ from 'lodash';
import ScheduleLegendItem from '../Components/ScheduleLegendItem';

export type Night = {
    night: number;
    bands: BitterJesterApplication[]
}

export type Schedule = {
    fridayNightOne: BitterJesterApplication[],
    fridayNightTwo: BitterJesterApplication[],
    fridayNightThree: BitterJesterApplication[],
    fridayNightFour: BitterJesterApplication[],
    nights: Night[]
}

export const ScheduleContainer = () => {
    const initialSchedule: Schedule = {
        fridayNightOne: [],
        fridayNightTwo: [],
        fridayNightThree: [],
        fridayNightFour: [],
        nights: []
    };
    const [schedule, setSchedule] = useState(initialSchedule);
    const [isSaveAlertOpen, setIsSaveAlertOpen] = useState(false);

    useEffect(() => {
        async function fetch() {
            await getFromS3('friday-night-schedule.json', setSchedule);
        }
        fetch();
    }, []);

    const saveSchedule = () => {
        const s3Client = new S3Client(process.env.REACT_APP_AWS_ACCESS_ID, process.env.REACT_APP_AWS_SECRET_KEY);

        s3Client.put(s3Client.createPutPublicJsonRequest('bitter-jester-test', 'friday-night-schedule.json', JSON.stringify(schedule)));
        onAlert();
    }

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

    const onAlert = () => {
        setIsSaveAlertOpen(!isSaveAlertOpen);
    }

    return (
        <Container fluid>
            <div style={{ padding: '16px' }}>
                <CardContainer>
                    <Alert isOpen={isSaveAlertOpen} toggle={onAlert} style={{textAlign: 'center'}}>The schedule has been updated!</Alert>
                    <Button onClick={saveSchedule}>Save Schedule</Button>
                    <Title titleDisplayText={'Suggested Friday Night Schedule'} />
                    <ScheduleLegendItem />
                    <SuggestedScheduleDragAndDropLists schedule={schedule} updateSchedule={updateSchedule} />
                </CardContainer>
            </div>
        </Container>
    );
}