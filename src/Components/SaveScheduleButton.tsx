import React, { Fragment } from 'react';
import { Button } from 'reactstrap';
import { S3Client } from '../aws/s3Client';
import { Schedule, LAST_SAVE_VERSION } from '../Containers/ScheduleContainer';
import '../static/saveScheduleButton.css';
import _ from 'lodash';

type Props = {
    schedule: Schedule,
    onAlert: Function
}

const SaveScheduleButton = (props: Props) => {
    const { schedule, onAlert } = props;    

    const saveSchedule = () => {
        const s3Client = new S3Client(process.env.REACT_APP_AWS_ACCESS_ID, process.env.REACT_APP_AWS_SECRET_KEY);
        const scheduleCopy = _.cloneDeep(schedule);
        scheduleCopy.version = LAST_SAVE_VERSION;
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
            <div className={'saveScheduleButtonContainer'}>
                <Button className={'saveScheduleButton'} onClick={saveSchedule}>Save Schedule</Button>
            </div>
        </Fragment>
    );
}

export default SaveScheduleButton;