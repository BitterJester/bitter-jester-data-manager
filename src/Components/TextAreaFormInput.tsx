import React from 'react';
import {FormGroup, Input, Label} from "reactstrap";

type Props = {
    label: string;
    id: string;
    updateParent: (event: object) => void;
    textAreaValue: string;
}

const TextAreaFormInput = (props: Props) => {
    const {label, id, updateParent, textAreaValue} = props;

    return (
        <FormGroup className={'text-area-question-group'}>
            <Label for={id}>
                {label}
            </Label>
            <Input
                onChange={updateParent}
                value={textAreaValue}
                className={'text-area'}
                type={'textarea'}
                name={id}
                id={id}/>
        </FormGroup>
    );
};

export default TextAreaFormInput;