import React, { useState } from 'react';
import { publishSNS } from '../../aws/publishSNS';
import { Alert, Button } from 'reactstrap';
import {UrlHelper} from "../../utils/url-helper";

const UpdateInfoTopicArn = 'arn:aws:sns:us-east-1:771384749710:CheckJotFormForUpdatesSnsTopic';

export const UpdateInfoButton = () => {
    const [showAlert, setShowAlert] = useState(false);
    const updateInfo = async () => {
        await publishSNS({Message: `competition=${UrlHelper.parseQueryParams().competition}`, TopicArn: UpdateInfoTopicArn});

        onAlertStatusChange();
    };

    const onAlertStatusChange = () => {
        setShowAlert(!showAlert);
    }

    return (
        <div style={{padding:'15px'}}>
            <Alert color="success" isOpen={showAlert} toggle={onAlertStatusChange}>
                Info update has been commenced in the background. Refresh page to see change.
            </Alert>
            <Button style={{background: 'rgb(123, 93, 151)'}} onClick={updateInfo}>Update Submissions in Background</Button>
        </div>
    );
}