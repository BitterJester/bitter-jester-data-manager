import React from 'react';
import {Card, Form} from "reactstrap";
import {Title} from "../Title";
import TextAreaFormInput from "../ TextAreaFormInput";
import {useAuth0} from "../../react-auth0-spa";

const OriginalSongJudgingFormCard = () => {
    const {user} = useAuth0();

    return (
        <Card className={'original-song-judging-form-card'}>
            <div>
                <Title titleDisplayText={'JUDGING FORM'}/>
                <Form>
                    <TextAreaFormInput label={'What were your initial impressions?'}
                                       id={'initialImpressions'}/>
                    <TextAreaFormInput label={'What feedback or suggestions would you give the artist(s)?'}
                                       id={'feedback'}/>
                    <TextAreaFormInput label={'What did you like most about what you heard? Please keep this positive'}
                                       id={'favoriteAspect'}/>
                </Form>
                <button>
                    Save
                </button>
            </div>
        </Card>
    );
};

export default OriginalSongJudgingFormCard;