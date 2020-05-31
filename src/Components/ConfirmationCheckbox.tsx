import React from 'react';
import {Col, Row} from "reactstrap";
import {OnClickFunction} from "./SortIncompleteApplicationsDropdown";

type Props = {
    toggleCheckBox: OnClickFunction;
    isChecked: boolean;
    disabled?: boolean;
}

const ConfirmationCheckbox = (props: Props) => {
    const {isChecked, toggleCheckBox, disabled} = props;
    const enabledText = ' By checking this box, you affirm that you have listened to each song in its entirety and provided thoughtful and meaningful feedback to each entrant. Once you click "submit" you will not be able to change your rankings';
    const disabledText = ' Your rankings have been submitted.  If this was a mistake, please contact Spencer Kasper at spencer.kasper@gmail.com to resolve the issue.';
    const color = !disabled ? '#e79e31' : 'green';
    return (
        <Row style={{padding: '16px 0 0 16px'}}>
            <Col style={{textAlign: 'left'}}>
                <p style={{display: 'inline-block', color: color, fontWeight: 'bold'}}>
                    <input type={'checkbox'}
                           checked={isChecked}
                           onClick={toggleCheckBox}
                           disabled={disabled}
                    />
                    {disabled ? disabledText : enabledText}
                </p>
            </Col>
        </Row>
    );
};

export default ConfirmationCheckbox;