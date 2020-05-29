import React, {useEffect, useState} from 'react';
import {Alert, Button, Card, Col, Row} from 'reactstrap';
import {Title} from "../Title";
import {OriginalSong, OriginalSongs} from "../../Pages/OriginalSongCompetition";
import RankingDropdown from "../RankingDropdown";
import {S3Client} from "../../aws/s3Client";
import {useAuth0} from "../../react-auth0-spa";

type Props = {
    originalSongs: OriginalSongs;
}

export type SongRanking = {
    firstPlace?: {
        songName: string;
        bandName: string;
        value: 3;
    },
    secondPlace?: {
        songName: string;
        bandName: string;
        value: 2;
    },
    thirdPlace?: {
        songName: string;
        bandName: string;
        value: 1;
    }
}
const s3Client = new S3Client();

const OverallBandRankingsCard = (props: Props) => {
    const {originalSongs} = props;
    const [isFirstPlaceOpen, setIsFirstPlaceOpen] = useState(false);
    const [isSecondPlaceOpen, setIsSecondPlaceOpen] = useState(false);
    const [isThirdPlaceOpen, setIsThirdPlaceOpen] = useState(false);
    const [songRankings, setSongRankings] = useState({} as SongRanking);

    const {user} = useAuth0();
    const bandRankingsS3Key = `overall-song-rankings/${user.nickname.replace('.', '_')}.json`;

    useEffect(() => {
        const fetch = async () => {
            const loadedSongRankings = await s3Client.getObject(bandRankingsS3Key);

            if (loadedSongRankings) {
                setSongRankings(loadedSongRankings)
            }
        };

        fetch();
    }, []);


    const toggleFirst = () => {
        setIsFirstPlaceOpen(!isFirstPlaceOpen);
    };

    const toggleSecond = () => {
        setIsSecondPlaceOpen(!isSecondPlaceOpen);
    };

    const toggleThird = () => {
        setIsThirdPlaceOpen(!isThirdPlaceOpen);
    };


    const updateSongRankings = (song: OriginalSong, placeToUpdate: keyof SongRanking) => {
        const placeValueMap = {
            firstPlace: 3,
            secondPlace: 2,
            thirdPlace: 1
        };

        setSongRankings(
            {
                ...songRankings,
                [placeToUpdate]: song ? {
                    songName: song.songName,
                    bandName: song.bandName,
                    value: placeValueMap[placeToUpdate]
                } : undefined
            }
        );
    };

    const generateAnyNecessaryErrors = () => {
        const songPlacements = Object.values(songRankings)
            .filter(placement => placement);

        const duplicateSongs = songPlacements
            .map(placement => placement.songName)
            .filter((value, index, array) => array.indexOf(value) === index)
            .length !== songPlacements.length;

        const NUMBER_OF_PLACES = 3;
        const emptyPlaces = songPlacements.length < NUMBER_OF_PLACES;

        const errorMessages = ['NOT SUBMITTED']

        if (duplicateSongs) {
            errorMessages.push('You may not choose a song more than once.');
        }

        if (emptyPlaces) {
            errorMessages.push('You may not leave any places empty.');
        }

        return duplicateSongs || emptyPlaces ? errorMessages : [];
    };

    const submitBandRankings = async () => {
        const errorMessages = generateAnyNecessaryErrors();
        if (errorMessages.length === 0) {
            await s3Client.put(
                s3Client.createPutPublicJsonRequest(
                    'bitter-jester-test',
                    bandRankingsS3Key,
                    JSON.stringify(songRankings)
                )
            );
            setAlert({color: 'success', isOpen: true, message: ['Successfully submitted your rankings.']});
        } else {
            setAlert({color: 'danger', isOpen: true, message: errorMessages});
        }
    };

    const [alert, setAlert] = useState({color: 'success', isOpen: false, message: []})

    return (
        <Card className={'overall-band-rankings-card'}>
            <Alert isOpen={alert.isOpen} color={alert.color} toggle={() => setAlert({...alert, isOpen: !alert.isOpen})}>
                {alert.message.map((messageItem, index) => {
                    return (
                        <div key={index}>
                            {messageItem}
                        </div>
                    )
                })}
            </Alert>
            <Title titleDisplayText={'OVERALL SONG RANKINGS'}/>
            <Row>
                <Col>
                    <div className={'ranking-dropdown-container'}>
                        <h4 className={'ranking-title'}>
                            1st PLACE
                        </h4>
                        <RankingDropdown originalSongs={originalSongs}
                                         isOpen={isFirstPlaceOpen}
                                         toggle={toggleFirst}
                                         updateSongRankings={updateSongRankings}
                                         songRankings={songRankings}
                                         placeToUpdate={'firstPlace'}/>
                    </div>
                </Col>
                <Col>
                    <div className={'ranking-dropdown-container'}>
                        <h4 className={'ranking-title'}>
                            2nd PLACE
                        </h4>
                        <RankingDropdown originalSongs={originalSongs}
                                         isOpen={isSecondPlaceOpen}
                                         toggle={toggleSecond}
                                         updateSongRankings={updateSongRankings}
                                         songRankings={songRankings}
                                         placeToUpdate={'secondPlace'}/>
                    </div>
                </Col>
                <Col>
                    <div className={'ranking-dropdown-container'}>
                        <h4 className={'ranking-title'}>
                            3rd PLACE
                        </h4>
                        <RankingDropdown originalSongs={originalSongs}
                                         isOpen={isThirdPlaceOpen}
                                         toggle={toggleThird}
                                         updateSongRankings={updateSongRankings}
                                         songRankings={songRankings}
                                         placeToUpdate={'thirdPlace'}/>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className={'button-container'}>
                        <Button className={'submit-button'} onClick={submitBandRankings}>
                            Submit
                        </Button>
                    </div>
                </Col>
            </Row>
        </Card>
    );
};

export default OverallBandRankingsCard;