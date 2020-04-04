import React, { useState } from 'react';
import { publishSNS } from '../aws/publishSNS';
import { Alert, Button } from 'reactstrap';

const UpdateInfoTopicArn = 'arn:aws:sns:us-east-1:771384749710:IncompleteApplicationsFromJotFormSnsTopic';

const UpdateIncompleteInfoButton = () => {
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
                We are grabbing new data in the background.  Please refresh this page to see updates.
            </Alert>
            <Button style={{background: 'rgb(123, 93, 151)'}} onClick={updateInfo}>Kick off update job</Button>
        </div>
    );
};

export default UpdateIncompleteInfoButton;