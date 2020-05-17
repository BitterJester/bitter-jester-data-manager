import React, {useState} from 'react';
import {Card, Form} from "reactstrap";
import {Title} from "../Title";
import TextAreaFormInput from "../ TextAreaFormInput";
import {useAuth0} from "../../react-auth0-spa";
import {S3Client} from "../../aws/s3Client";

type Judge = {
    email: string;
    nickname: string;
}

type JudgeFeedback = {
    judge: Judge;
    initialImpression: string;
    feedback: string;
    favoriteAspect: string;
    songInfo: {
        songName: string;
    }
}

type Props = {
    bandName: string;
    songName: string;
}

const OriginalSongJudgingFormCard = (props: Props) => {
    const {user} = useAuth0();
    const {bandName, songName} = props;

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

    const combineAndSave = async (): Promise<void> => {
        const judgeFeedback: JudgeFeedback = {
            initialImpression: initialImpressions,
            feedback: feedback,
            favoriteAspect: favoriteAspect,
            judge: {
                email: user.email,
                nickname: user.nickname
            },
            songInfo: {
                songName: songName
            }
        };

        const formatFileName = () => {
            const handleSpacesAndUppercase = (value: string) => {
                return value.replace(' ', '_').toLowerCase();
            };
            const formattedBandName = handleSpacesAndUppercase(bandName);
            const formattedSongName = handleSpacesAndUppercase(songName);

            return `judges/${user.nickname}/${formattedSongName}-${formattedBandName}.json`;
        };

        const s3Client = new S3Client();
        await s3Client.put(
            s3Client.createPutPublicJsonRequest(
                'bitter-jester-test',
                formatFileName(),
                JSON.stringify(judgeFeedback)
            )
        );
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
                <button onClick={combineAndSave}>
                    Save
                </button>
            </div>
        </Card>
    );
};

export default OriginalSongJudgingFormCard;