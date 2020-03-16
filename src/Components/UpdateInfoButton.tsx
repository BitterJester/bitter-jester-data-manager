import React, { useState } from 'react';
import { publishSNS } from '../aws/publishSNS';
import { Alert, Button } from 'reactstrap';

const UpdateInfoTopicArn = 'arn:aws:sns:us-east-1:771384749710:CheckJotFormForUpdatesSnsTopic';

export const UpdateInfoButton = () => {
    const [showAlert, setShowAlert] = useState(false);
    const updateInfo = async () => {
        await publishSNS({Message: 'UpdateInfo', TopicArn: UpdateInfoTopicArn});

        onAlertStatusChange();
    };

    const onAlertStatusChange = () => {
        setShowAlert(!showAlert);
    }

    return (
        <div style={{padding:'15px'}}>
            <Alert color="success" isOpen={showAlert} toggle={onAlertStatusChange}>
                Info update has been commenced in the background.
            </Alert>
            <Button style={{backgroundColor: '#7b5d97'}} onClick={updateInfo}>Update Submissions in Background</Button>
        </div>
    );
}