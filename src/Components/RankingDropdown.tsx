import React from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import {OriginalSongs} from "../Pages/OriginalSongCompetition";
import {DropdownItemOnClick} from "./SortIncompleteApplicationsDropdown";
import {SongRanking} from "./Cards/OverallBandRankingsCard";
import {dropdownMenuModifiers} from "../utils/dropdownMenuModifiers";

type Props = {
    originalSongs: OriginalSongs;
    isOpen: boolean;
    toggle: DropdownItemOnClick;
    updateSongRankings: Function;
    selectedSong: SongRanking;
}

const RankingDropdown = (props: Props) => {
    const {originalSongs, isOpen, toggle, updateSongRankings, selectedSong} = props;
    const {songName, bandName, placementName} = selectedSong;

    const dropdownItems = originalSongs.originalSongs.map(song => {
        return (
            <DropdownItem onClick={() => updateSongRankings(song, selectedSong)}>
                {`"${song.songName}" by ${song.bandName}`}
            </DropdownItem>
        );
    });

    const defaultDropdownItemTitle = `Please select your ${placementName} choice.`;
    dropdownItems.unshift(
        <DropdownItem onClick={() => updateSongRankings(undefined, selectedSong)}>
            <div style={{padding: '8px'}}></div>
        </DropdownItem>
    );
    return (
        <Dropdown className={'ranking-dropdown'} isOpen={isOpen} toggle={toggle}>
            <DropdownToggle className={'toggle'} caret>
                {
                    songName && bandName ?
                        `"${songName}" by ${bandName}` :
                        defaultDropdownItemTitle
                }
            </DropdownToggle>
            <DropdownMenu modifiers={dropdownMenuModifiers}>
                {
                    dropdownItems
                }
            </DropdownMenu>
        </Dropdown>
    );
};

export default RankingDropdown;