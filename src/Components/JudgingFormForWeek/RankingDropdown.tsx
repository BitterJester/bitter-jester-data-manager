import React from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import {OriginalSongs} from "../../Pages/OriginalSongCompetition";
import {OnClickFunction} from "../SortIncompleteApplicationsDropdown";
import {SongRanking} from "../Cards/OverallBandRankingsCard";
import {dropdownMenuModifiers} from "../../utils/dropdownMenuModifiers";

type Props = {
    originalSongs: OriginalSongs;
    isOpen: boolean;
    toggle: OnClickFunction;
    updateSongRankings: Function;
    selectedSong: SongRanking;
    disabled?: boolean;
}

const RankingDropdown = (props: Props) => {
    const {originalSongs, isOpen, toggle, updateSongRankings, selectedSong, disabled} = props;
    const {songName, bandName, placementName} = selectedSong;

    const removeThatOneSongThatIsntAllowedToBeVotedFor = () => {
        return originalSongs.originalSongs.filter(song => song.songName.toLowerCase() !== 'song for fina');
    };

    const filteredOriginalSongs = removeThatOneSongThatIsntAllowedToBeVotedFor();

    const dropdownItems = filteredOriginalSongs.map(song => {
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
        <Dropdown disabled={disabled} className={'ranking-dropdown'} isOpen={isOpen} toggle={toggle}>
            <DropdownToggle disabled={disabled} className={'toggle'} caret>
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