import React, {useState} from 'react';
import {Col, Row} from "reactstrap";
import RankingDropdown from "./RankingDropdown";
import {OriginalSong, OriginalSongs} from "../Pages/OriginalSongCompetition";
import {SongRanking} from "./Cards/OverallBandRankingsCard";

type Props = {
    originalSongs: OriginalSongs;
    songRankings: SongRanking;
    setSongRankings: Function;
}

const OverallSongRankingsDropdownRow = (props: Props) => {
    const {originalSongs, songRankings, setSongRankings} = props;


    const [isFirstPlaceOpen, setIsFirstPlaceOpen] = useState(false);
    const [isSecondPlaceOpen, setIsSecondPlaceOpen] = useState(false);
    const [isThirdPlaceOpen, setIsThirdPlaceOpen] = useState(false);

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

    return (
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
    );
};

export default OverallSongRankingsDropdownRow;