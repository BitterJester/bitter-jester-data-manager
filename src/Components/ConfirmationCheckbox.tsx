import React from 'react';
import {Col, Row} from "reactstrap";
import {OnClickFunction} from "./SortIncompleteApplicationsDropdown";

type Props = {
    toggleCheckBox: OnClickFunction;
    isChecked: boolean;
}

const ConfirmationCheckbox = (props: Props) => {
    const {isChecked, toggleCheckBox} = props;
    return (
        <Row style={{padding: '16px 0 0 16px'}}>
            <Col style={{textAlign: 'left'}}>
                <p style={{display: 'inline-block', color: 'red', fontWeight: 'bold'}}>
                    <input type={'checkbox'} checked={isChecked}
                           onClick={toggleCheckBox}/>{' Once you submit, you will not be able to change your rankings. By checking this box, you confirm that you have listened to all of the songs in their entirety.'}
                </p>
            </Col>
        </Row>
    );
};

export default ConfirmationCheckbox;