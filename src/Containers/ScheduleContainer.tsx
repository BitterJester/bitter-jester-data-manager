import React, { useState, useEffect } from 'react';
import { Container, Card } from 'reactstrap';
import { SuggestedScheduleDragAndDropLists } from '../Components/SuggestedScheduleDragAndDropLists';
import { getFromS3 } from '../s3/getFromS3';
import { BitterJesterApplication } from '../Pages/Submissions/Submissions';

export type Schedule = {
    fridayNightOne: BitterJesterApplication[],
    fridayNightTwo: BitterJesterApplication[],
    fridayNightThree: BitterJesterApplication[],
    fridayNightFour: BitterJesterApplication[]
}

export const ScheduleContainer = () => {
    const initialSchedule: Schedule = {
        fridayNightOne: [],
        fridayNightTwo: [],
        fridayNightThree: [],
        fridayNightFour: []
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