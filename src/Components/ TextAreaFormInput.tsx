import React from 'react';
import {FormGroup, Input, Label} from "reactstrap";

type Props = {
    label: string;
    id: string;

}

const TextAreaFormInput = (props: Props) => {
    const {label, id} = props;
    return (
        <FormGroup className={'text-area-question-group'}>
            <Label for={id}>
                {label}
            </Label>
            <Input className={'text-area'} type={'textarea'} name={id} id={id}/>
        </FormGroup>
    );
};

export default TextAreaFormInput;