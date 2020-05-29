import React, {useState} from 'react';
import {Col, Row} from "reactstrap";
import RankingDropdown from "./RankingDropdown";
import {OriginalSong, OriginalSongs} from "../Pages/OriginalSongCompetition";
import {SongRanking, SongRankings} from "./Cards/OverallBandRankingsCard";
import _ from 'lodash';

type Props = {
    originalSongs: OriginalSongs;
    songRankings: SongRankings;
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


    const updateSongRankings = (song: OriginalSong, placeToUpdate: SongRanking) => {
        const newPlacement: SongRanking = {...placeToUpdate, songName: song.songName, bandName: song.bandName};

        const songRankingsCopy = _.cloneDeep(songRankings.rankings);
        const rankingHasBeenPopulatedBefore = songRankings.rankings.filter(ranking => ranking.placement === placeToUpdate.placement).length === 1;

        if (rankingHasBeenPopulatedBefore) {
            const updatedSongRankings = rankingHasBeenPopulatedBefore &&
                songRankingsCopy.map(ranking => {
                    if (ranking.placement === newPlacement.placement) {
                        return newPlacement;
                    }
                    return ranking;
                });
            setSongRankings({...songRankings, rankings: updatedSongRankings});
        } else {
            songRankingsCopy.push(newPlacement);
            console.log(songRankingsCopy)

            setSongRankings({...songRankings, rankings: songRankingsCopy})
        }
    };

    const defaultFirstPlace = {placement: 1, placementName: 'first place', value: 3};
    const defaultSecondPlace = {placement: 2, placementName: 'second place', value: 2};
    const defaultThirdPlace = {placement: 3, placementName: 'third place', value: 1};

    const getSelectedPlacement = (placement) => {
        return songRankings.rankings.filter(ranking => ranking.placement === placement)[0];
    }

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
                                     selectedSong={getSelectedPlacement(defaultFirstPlace.placement) || defaultFirstPlace}/>
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
                                     selectedSong={getSelectedPlacement(defaultSecondPlace.placement) || defaultSecondPlace}/>
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
                                     selectedSong={getSelectedPlacement(defaultThirdPlace.placement) || defaultThirdPlace}/>
                </div>
            </Col>
        </Row>
    );
};

export default OverallSongRankingsDropdownRow;