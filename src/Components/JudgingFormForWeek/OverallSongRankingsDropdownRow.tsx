import React from 'react';
import {Row} from "reactstrap";
import {OriginalSong, OriginalSongs} from "../../pages/OriginalSongCompetition";
import {SongRanking, SongRankings} from "../Cards/OverallBandRankingsCard";
import _ from 'lodash';
import {PLACES} from "../../static/constants/places";
import {RankingDropdownContainer} from "./RankingDropdownContainer";

type Props = {
    originalSongs: OriginalSongs;
    songRankings: SongRankings;
    setSongRankings: Function;
}

const OverallSongRankingsDropdownRow = (props: Props) => {
    const {originalSongs, songRankings, setSongRankings} = props;

    const updatePreviouslyPopulatedRanking = (rankings: SongRanking[], newPlacement: SongRanking) => {
        const updatedSongRankings = rankings.map(ranking => {
            if (ranking.placement === newPlacement.placement) {
                return newPlacement;
            }
            return ranking;
        });
        setSongRankings({...songRankings, rankings: updatedSongRankings});
    };

    const updateSongRankings = (song: OriginalSong, placeToUpdate: SongRanking) => {
        const newPlacement: SongRanking = {...placeToUpdate, songName: song.songName, bandName: song.bandName};

        const songRankingsCopy = _.cloneDeep(songRankings.rankings);
        const rankingHasBeenPopulatedBefore = songRankings.rankings.filter(ranking => ranking.placement === placeToUpdate.placement).length === 1;

        if (rankingHasBeenPopulatedBefore) {
            updatePreviouslyPopulatedRanking(songRankingsCopy, newPlacement);
        } else {
            songRankingsCopy.push(newPlacement);
            setSongRankings({...songRankings, rankings: songRankingsCopy})
        }
    };

    const isDisabled = songRankings.isFinalRanking;

    const getSelectedPlacement = (placement) => {
        return songRankings.rankings.filter(ranking => ranking.placement === placement)[0];
    };

    return (
        <Row>
            {
                PLACES.map(place => {
                    return (
                        <RankingDropdownContainer
                            originalSongs={originalSongs}
                            updateSongRankings={updateSongRankings}
                            selectedPlacement={getSelectedPlacement(place.placement)}
                            disabled={isDisabled}
                            place={place}
                        />
                    )
                })
            }
        </Row>
    );
};

export default OverallSongRankingsDropdownRow;