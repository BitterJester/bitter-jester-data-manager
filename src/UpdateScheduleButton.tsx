import React from 'react';
import { Button } from 'reactstrap';
import { publishSNS } from './aws/publishSNS';
import './static/button.css';

const UPDATE_SCHEDULE_TOPIC_ARN = 'arn:aws:sns:us-east-1:771384749710:BandApplicationUpdatedSnsTopic';

type Props = {
    onAlert: Function;
}

const UpdateScheduleButton = (props: Props) => {
    const updateSchdule = async () => {
        await publishSNS({Message: 'UpdateSchedule', TopicArn: UPDATE_SCHEDULE_TOPIC_ARN})
        props.onAlert();
    }
    
    return (
        <div className={'buttonContainer'}>
            <Button className={'button'} onClick={updateSchdule}>Update Schedule</Button>
        </div>
    )
}

export default UpdateScheduleButton;