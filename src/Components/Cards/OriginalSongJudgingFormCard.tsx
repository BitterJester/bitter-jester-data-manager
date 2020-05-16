import React from 'react';
import {Card, Form} from "reactstrap";
import {Title} from "../Title";
import TextAreaFormInput from "../ TextAreaFormInput";

const OriginalSongJudgingFormCard = () => {
    return (
        <Card className={'original-song-judging-form-card'}>
            <div>
                <Title titleDisplayText={'JUDGING FORM'}/>
                <Form>
                    <TextAreaFormInput label={'What were your initial impressions?'} id={'initialImpressions'}/>
                    <TextAreaFormInput label={'What feedback or suggestions would you give the artist(s)?'}
                                       id={'feedback'}/>
                    <TextAreaFormInput label={'What did you like most about what you heard? Please keep this positive'}
                                       id={'favoriteAspect'}/>
                </Form>
            </div>
        </Card>
    );
};

export default OriginalSongJudgingFormCard;