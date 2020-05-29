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
    const enabledText = ' Once you submit, you will not be able to change your rankings. By checking this box, you confirm that you have listened to all of the songs in their entirety.';
    const disabledText = ' Your rankings have been submitted.  If this was a mistake, please contact Spencer Kasper at spencer.kasper@gmail.com to resolve the issue.';
    const color = !disabled ? 'red' : 'green';
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