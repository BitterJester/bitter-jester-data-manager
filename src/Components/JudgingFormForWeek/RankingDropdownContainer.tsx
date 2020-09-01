import {Place} from "../../static/constants/places";
import {OriginalSong, OriginalSongs} from "../../Pages/OriginalSongCompetition";
import {SongRanking} from "../Cards/OverallBandRankingsCard";
import React, {useState} from "react";
import {Col} from "reactstrap";
import RankingDropdown from "./RankingDropdown";

export const RankingDropdownContainer = (props: { place: Place, originalSongs: OriginalSongs, updateSongRankings: (song: OriginalSong, placeToUpdate: SongRanking) => void, selectedPlacement: SongRanking, disabled: boolean }) => {
    const {originalSongs, updateSongRankings, selectedPlacement, place, disabled} = props;

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <Col>
            <div className={"ranking-dropdown-container"}>
                <h4 className={"ranking-title"}>
                    {place.placementName}
                </h4>
                <RankingDropdown
                    originalSongs={originalSongs}
                    isOpen={isDropdownOpen}
                    toggle={() => setIsDropdownOpen(!isDropdownOpen)}
                    updateSongRankings={updateSongRankings}
                    selectedSong={selectedPlacement || place}
                    disabled={disabled}
                />
            </div>
        </Col>
    );
};