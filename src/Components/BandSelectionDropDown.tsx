import React from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {OriginalSong, OriginalSongs} from "../Pages/OriginalSongCompetition";
import {DropdownItemOnClick} from "./SortIncompleteApplicationsDropdown";

type Props = {
    dropdownOpen: boolean;
    toggle: DropdownItemOnClick;
    originalSongs: OriginalSongs;
    updateSongIndex: DropdownItemOnClick;
    selected: OriginalSong;
}

const BandSelectionDropDown = (props: Props) => {
    const {originalSongs, dropdownOpen, toggle, updateSongIndex, selected} = props;

    return (
        <div className={'band-selection-dropdown'}>
            <Dropdown className={'scheduleDropdownContainer'} isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle className={'toggle'} caret>
                    {selected ? `"${selected.songName}" by ${selected.bandName}` : '' +
                        ''}
                </DropdownToggle>
                <DropdownMenu>
                    {
                        originalSongs.originalSongs.map(song => {
                            return (
                                <DropdownItem onClick={updateSongIndex}>
                                    {`"${song.songName}" by ${song.bandName}`}
                                </DropdownItem>
                            );
                        })
                    }
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default BandSelectionDropDown;