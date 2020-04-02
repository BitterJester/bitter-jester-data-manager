import React, { useState, Fragment } from 'react';
import { Alert, Row, Button } from 'reactstrap';
import { S3Client } from '../aws/s3Client';
import { Schedule, USER_SAVE_VERSION } from '../Containers/ScheduleContainer';
import '../static/saveScheduleButton.css';
import _ from 'lodash';

type Props = {
    schedule: Schedule
}

const SaveScheduleButton = (props: Props) => {
    const [isSaveAlertOpen, setIsSaveAlertOpen] = useState(false);
    const { schedule } = props;

    const onAlert = () => {
        setIsSaveAlertOpen(!isSaveAlertOpen);
    }

    const saveSchedule = () => {
        const s3Client = new S3Client(process.env.REACT_APP_AWS_ACCESS_ID, process.env.REACT_APP_AWS_SECRET_KEY);
        const scheduleCopy = _.cloneDeep(schedule);
        scheduleCopy.version = USER_SAVE_VERSION;
        s3Client.put(
            s3Client.createPutPublicJsonRequest(
                'bitter-jester-test',
                'user-friday-night-schedule.json',
                JSON.stringify(scheduleCopy)
            )
        );
        onAlert();
    }

    return (
        <Fragment>
            <Alert isOpen={isSaveAlertOpen} toggle={onAlert} style={{ textAlign: 'center' }}>The schedule has been updated!</Alert>
            <div className={'saveScheduleButtonContainer'}>
                <Row>
                    <Button onClick={saveSchedule}>Save Schedule</Button>
                </Row>
            </div>
        </Fragment>
    );
}

export default SaveScheduleButton;