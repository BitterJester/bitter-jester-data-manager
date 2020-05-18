import React, {useState} from 'react';
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
    },
    secondPlace?: {
        songName: string;
        bandName: string;
    },
    thirdPlace?: {
        songName: string;
        bandName: string;
    }
}

const OverallBandRankingsCard = (props: Props) => {
    const {originalSongs} = props;
    const [isFirstPlaceOpen, setIsFirstPlaceOpen] = useState(false);
    const [isSecondPlaceOpen, setIsSecondPlaceOpen] = useState(false);
    const [isThirdPlaceOpen, setIsThirdPlaceOpen] = useState(false);
    const [songRankings, setSongRankings] = useState({} as SongRanking);

    const {user} = useAuth0();

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
        setSongRankings(
            {
                ...songRankings,
                [placeToUpdate]: song ? {songName: song.songName, bandName: song.bandName} : undefined
            }
        );
    };

    const submitBandRankings = async () => {
        const s3Client = new S3Client();
        await s3Client.put(
            s3Client.createPutPublicJsonRequest(
                'bitter-jester-test',
                `overall-song-rankings/${user.nickname}.json`,
                JSON.stringify(songRankings)
            )
        );

        setIsAlertOpen(true);
    };

    const [isAlertOpen, setIsAlertOpen] = useState(false);

    return (
        <Card className={'overall-band-rankings-card'}>
            <Alert isOpen={isAlertOpen} toggle={() => setIsAlertOpen(!isAlertOpen)}>
                {'Successfully submitted your rankings.'}
            </Alert>
            <Title titleDisplayText={'OVERALL SONG RANKINGS'}/>
            <div className={'judging-reminder-alert-container'}>
                <p className={'judging-reminder-alert'}>
                    This is where you can select the overall winners for the week you are judging.
                    Once you have selected a band in one of the drop downs, they will be removed
                    from the other drop downs. Feel free to update this as many times as you wish
                    while you are going through the different submissions. Once you
                    are ready to lock in your rankings, click submit.
                </p>
            </div>
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