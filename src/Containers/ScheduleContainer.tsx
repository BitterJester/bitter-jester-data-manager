import React, { useState, useEffect } from 'react';
import { Container, Button } from 'reactstrap';
import { SuggestedScheduleDragAndDropLists } from '../Components/SuggestedScheduleDragAndDropLists';
import { getFromS3 } from '../aws/getFromS3';
import { BitterJesterApplication } from '../Pages/Submissions/Submissions';
import CardContainer from '../Components/CardContainer';
import { Title } from '../Components/Title';
import { S3Client } from '../aws/s3Client';
import _ from 'lodash';

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

    useEffect(() => {
        async function fetch() {
            await getFromS3('friday-night-schedule.json', setSchedule);
        }
        fetch();
    }, []);

    const saveSchedule = () => {
        const s3Client = new S3Client(process.env.REACT_APP_AWS_ACCESS_ID, process.env.REACT_APP_AWS_SECRET_KEY);

        s3Client.put(s3Client.createPutPublicJsonRequest('bitter-jester-test', 'friday-night-schedule.json', JSON.stringify(schedule)));
    }

    const updateSchedule = (columnRemovedFromIndex, rowRemovedFromIndex, columnAddedToIndex) => {
        const scheduleCopy = _.cloneDeep(schedule);
        const nights = scheduleCopy.nights;
        const bandToMove = nights[columnRemovedFromIndex].bands[rowRemovedFromIndex];
        console.log(`band to move ${bandToMove.bandName}`)
        let nightToAddTo = nights[columnAddedToIndex];
        console.log(`night to add to ${nightToAddTo.night}`)
        nightToAddTo.bands.push(bandToMove);
        const nightToRemoveFrom = nights.filter(night => {
            const isNightToRemoveFrom = _.isEqual(night.night, nights[columnRemovedFromIndex].night);
            return isNightToRemoveFrom;
        });
        console.log(`night to remove from ${nightToRemoveFrom[0].night}`);
        nightToRemoveFrom[0].bands = nightToRemoveFrom[0].bands.filter((band, index) => {
            return index !== rowRemovedFromIndex;
        });
        console.log(scheduleCopy.nights);
        setSchedule(scheduleCopy);
    }

    return (
        <Container fluid>
            <div style={{ padding: '16px' }}>
                <CardContainer>
                    <Button onClick={saveSchedule}>Save Schedule</Button>
                    <Title titleDisplayText={'Suggested Friday Night Schedule'} />
                    <SuggestedScheduleDragAndDropLists schedule={schedule} updateSchedule={updateSchedule} />
                </CardContainer>
            </div>
        </Container>
    );
}