import React from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import {OriginalSongs} from "../Pages/OriginalSongCompetition";
import {DropdownItemOnClick} from "./SortIncompleteApplicationsDropdown";
import {SongRanking} from "./Cards/OverallBandRankingsCard";

type Props = {
    originalSongs: OriginalSongs;
    isOpen: boolean;
    toggle: DropdownItemOnClick;
    updateSongRankings: Function;
    songRankings: SongRanking;
    placeToUpdate: keyof SongRanking;
}

const RankingDropdown = (props: Props) => {
    const {originalSongs, isOpen, toggle, songRankings, updateSongRankings, placeToUpdate} = props;
    const songRankingPlace = songRankings[placeToUpdate];
    const convertFromCamelCaseToLowercaseWithASpace = (camelCaseString: string) => {
        return camelCaseString.split(/(?=[A-Z])/)
            .map(x => x.toLowerCase())
            .join(' ');
    };

    const filterOutAlreadyPlacedSongs = () => {
        const firstFilteredOut = songRankings.firstPlace ?
            originalSongs.originalSongs.filter(song => song.songName !== songRankings.firstPlace.songName) :
            originalSongs.originalSongs;
        const secondFilteredOut = songRankings.secondPlace ?
            firstFilteredOut.filter(song => song.songName !== songRankings.secondPlace.songName) :
            firstFilteredOut;
        return songRankings.thirdPlace ?
            secondFilteredOut.filter(song => song.songName !== songRankings.thirdPlace.songName) :
            secondFilteredOut;
    };

    const dropdownItems = filterOutAlreadyPlacedSongs().map(song => {
        return (
            <DropdownItem onClick={() => updateSongRankings(song, placeToUpdate)}>
                {`"${song.songName}" by ${song.bandName}`}
            </DropdownItem>
        );
    });

    const defaultDropdownItemTitle = `Please select your ${convertFromCamelCaseToLowercaseWithASpace(placeToUpdate)} choice.`;
    dropdownItems.unshift(<DropdownItem onClick={() => updateSongRankings(undefined, placeToUpdate)}>
        <div style={{padding: '8px'}}></div>
    </DropdownItem>)
    return (
        <Dropdown className={'ranking-dropdown'} isOpen={isOpen} toggle={toggle}>
            <DropdownToggle className={'toggle'} caret>
                {
                    songRankingPlace ?
                        `"${songRankingPlace.songName}" by ${songRankingPlace.bandName}` :
                        defaultDropdownItemTitle
                }
            </DropdownToggle>
            <DropdownMenu>
                {
                    dropdownItems
                }
            </DropdownMenu>
        </Dropdown>
    );
};

export default RankingDropdown;