import React, {useState} from 'react';
import {FormGroup, Input, Label} from "reactstrap";

type Props = {
    label: string;
    id: string;

}

const TextAreaFormInput = (props: Props) => {
    const [textAreaValue, updateTextAreaValue] = useState('');
    const {label, id} = props;

    const handleChange = (event) => {
        updateTextAreaValue(event.target.value);
    };

    return (
        <FormGroup className={'text-area-question-group'}>
            <Label for={id}>
                {label}
            </Label>
            <Input onChange={handleChange}
                   value={textAreaValue}
                   className={'text-area'}
                   type={'textarea'}
                   name={id}
                   id={id}/>
        </FormGroup>
    );
};

export default TextAreaFormInput;