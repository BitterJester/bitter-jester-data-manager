import React, { useState, useEffect } from 'react';
import { Container, Card } from 'reactstrap';
import { SuggestedScheduleDragAndDropLists } from '../Components/SuggestedScheduleDragAndDropLists';
import { getFromS3 } from '../aws/getFromS3';
import { BitterJesterApplication } from '../Pages/Submissions/Submissions';

type Night = {
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
    
    return (
        <Container fluid>
            <div style={{ padding: '15px' }}>
                <Card>
                    <SuggestedScheduleDragAndDropLists schedule={schedule} />
                </Card>
            </div>
        </Container>
    );
}