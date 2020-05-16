import React, {useState} from 'react';
import {Card, Form} from "reactstrap";
import {Title} from "../Title";
import TextAreaFormInput from "../ TextAreaFormInput";
import {useAuth0} from "../../react-auth0-spa";

type Judge = {
    email: string;
}

type JudgeFeedback = {
    judge: Judge;
    initialImpression: string;
    feedback: string;
    favoriteAspect: string;
    bandName: string;
}

type Props = {
    bandName: string;
}

const OriginalSongJudgingFormCard = (props: Props) => {
    const {user} = useAuth0();
    const {bandName} = props;

    const [initialImpressions, setInitialImpressions] = useState('');

    const updateInitialImpressions = (event) => {
        setInitialImpressions(event.target.value);
    };
    const [feedback, setFeedback] = useState('');

    const updateFeedback = (event) => {
        setFeedback(event.target.value);
    };
    const [favoriteAspect, setFavoriteAspect] = useState('');

    const updateFavoriteAspect = (event) => {
        setFavoriteAspect(event.target.value);
    };

    const combine = (): JudgeFeedback => {
        const newVar = {
            initialImpression: initialImpressions,
            feedback: feedback,
            favoriteAspect: favoriteAspect,
            judge: {
                email: user.email
            },
            bandName
        };

        console.log(newVar);

        return newVar
    };

    return (
        <Card className={'original-song-judging-form-card'}>
            <div>
                <Title titleDisplayText={'JUDGING FORM'}/>
                <Form>
                    <TextAreaFormInput label={'What were your initial impressions?'}
                                       id={'initialImpressions'}
                                       updateParent={updateInitialImpressions}
                                       textAreaValue={initialImpressions}
                    />
                    <TextAreaFormInput label={'What feedback or suggestions would you give the artist(s)?'}
                                       id={'feedback'}
                                       updateParent={updateFeedback}
                                       textAreaValue={feedback}/>
                    <TextAreaFormInput label={'What did you like most about what you heard? Please keep this positive'}
                                       id={'favoriteAspect'}
                                       updateParent={updateFavoriteAspect}
                                       textAreaValue={favoriteAspect}/>
                </Form>
                <button onClick={combine}>
                    Save
                </button>
            </div>
        </Card>
    );
};

export default OriginalSongJudgingFormCard;