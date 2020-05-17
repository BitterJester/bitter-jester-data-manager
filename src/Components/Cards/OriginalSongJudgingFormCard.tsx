import React, {useEffect, useState} from 'react';
import {Alert, Card, Form} from "reactstrap";
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

    const [judgesComments, setJudgesComments] = useState({} as JudgeFeedback);

    const formatFileName = () => {
        const handleSpacesAndUppercase = (value: string) => {
            return value.replace(' ', '_').toLowerCase();
        };
        const formattedBandName = handleSpacesAndUppercase(bandName);
        const formattedSongName = handleSpacesAndUppercase(songName);
        return `judges-comments/${user.nickname}/${formattedSongName}-${formattedBandName}.json`;
    };

    const fileName = formatFileName();

    useEffect(() => {
        const getJudgesComments = async () => {
            const previousComments = bandName ? await new S3Client().getObject(fileName) as JudgeFeedback : {} as JudgeFeedback;
            console.log(previousComments)
            if (previousComments) {
                setJudgesComments(previousComments);
            } else {
                const initialJudgesComments: JudgeFeedback = {
                    initialImpression: '',
                    songInfo: {
                        songName: songName
                    },
                    favoriteAspect: '',
                    feedback: '',
                    judge: {
                        nickname: user.nickname,
                        email: user.email
                    }
                };

                setJudgesComments(initialJudgesComments);
            }
        };

        getJudgesComments();
    }, [fileName, bandName, songName, user.nickname, user.email]);

    const updateJudgesComments = (fieldToUpdate: keyof JudgeFeedback, value: string) => {
        setJudgesComments({...judgesComments, [fieldToUpdate]: value})
    };

    const updateInitialImpressions = (event) => {
        updateJudgesComments('initialImpression', event.target.value);
    };

    const updateFeedback = (event) => {
        updateJudgesComments('feedback', event.target.value);
    };

    const updateFavoriteAspect = (event) => {
        updateJudgesComments('favoriteAspect', event.target.value);
    };

    const combineAndSave = async (): Promise<void> => {
        const judgeFeedback: JudgeFeedback = {
            initialImpression: judgesComments.initialImpression,
            feedback: judgesComments.feedback,
            favoriteAspect: judgesComments.favoriteAspect,
            judge: {
                email: user.email,
                nickname: user.nickname
            },
            songInfo: {
                songName: songName
            }
        };

        const s3Client = new S3Client();
        await s3Client.put(
            s3Client.createPutPublicJsonRequest(
                'bitter-jester-test',
                fileName,
                JSON.stringify(judgeFeedback)
            )
        );
        toggle();
    };

    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const toggle = () => {
        setIsAlertOpen(!isAlertOpen);
    };

    return (
        <Card className={'original-song-judging-form-card'}>
            <div>
                <Title titleDisplayText={'JUDGING FORM'}/>
                <Alert isOpen={isAlertOpen} toggle={toggle} color={'success'}>Successfully saved your changes!</Alert>
                <Form>
                    <TextAreaFormInput label={'What were your initial impressions?'}
                                       id={'initialImpressions'}
                                       updateParent={updateInitialImpressions}
                                       textAreaValue={judgesComments.initialImpression || ''}
                    />
                    <TextAreaFormInput label={'What feedback or suggestions would you give the artist(s)?'}
                                       id={'feedback'}
                                       updateParent={updateFeedback}
                                       textAreaValue={judgesComments.feedback || ''}/>
                    <TextAreaFormInput label={'What did you like most about what you heard? Please keep this positive'}
                                       id={'favoriteAspect'}
                                       updateParent={updateFavoriteAspect}
                                       textAreaValue={judgesComments.favoriteAspect || ''}/>
                </Form>
                <button onClick={combineAndSave}>
                    Save
                </button>
            </div>
        </Card>
    );
};

export default OriginalSongJudgingFormCard;