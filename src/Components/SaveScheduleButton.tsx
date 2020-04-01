import React, { useState } from 'react';
import { Alert, Row, Button } from 'reactstrap';
import { S3Client } from '../aws/s3Client';
import { Schedule } from '../Containers/ScheduleContainer';

type Props = {
    schedule: Schedule
}

const SaveScheduleButton = (props: Props) => {
    const [isSaveAlertOpen, setIsSaveAlertOpen] = useState(false);
    const {schedule} = props;

    const onAlert = () => {
        setIsSaveAlertOpen(!isSaveAlertOpen);
    }

    const saveSchedule = () => {
        const s3Client = new S3Client(process.env.REACT_APP_AWS_ACCESS_ID, process.env.REACT_APP_AWS_SECRET_KEY);

        s3Client.put(s3Client.createPutPublicJsonRequest('bitter-jester-test', 'friday-night-schedule.json', JSON.stringify(schedule)));
        onAlert();
    }

    return (
        <div>
            <Alert isOpen={isSaveAlertOpen} toggle={onAlert} style={{ textAlign: 'center' }}>The schedule has been updated!</Alert>
            <Row>
                <Button onClick={saveSchedule}>Save Schedule</Button>
            </Row>
        </div>
    );
}

export default SaveScheduleButton;