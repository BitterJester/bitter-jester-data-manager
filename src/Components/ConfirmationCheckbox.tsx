import React from 'react';
import {Row} from "reactstrap";

const ConfirmationCheckbox = () => {
    return (
        <Row>
            <div style={{display: 'inline-block', paddingLeft: '32px'}}>
                <input type={'checkbox'}/>
            </div>
            <div style={{display: 'inline-block', color: 'red', paddingLeft: '8px', fontWeight: 'bold'}}>
                {'By checking this box, you confirm that you have listened to all of the songs in their entirety.  Once you submit, you will not be able to change your rankings.'}
            </div>
        </Row>
    );
};

export default ConfirmationCheckbox;