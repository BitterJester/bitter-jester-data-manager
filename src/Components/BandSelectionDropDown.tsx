import React from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {OriginalSongs} from "../Pages/OriginalSongCompetition";
import {DropdownItemOnClick} from "./SortIncompleteApplicationsDropdown";

type Props = {
    dropdownOpen: boolean;
    toggle: DropdownItemOnClick;
    originalSongs: OriginalSongs;
    updateSongIndex: DropdownItemOnClick;
}

const BandSelectionDropDown = (props: Props) => {
    const {originalSongs, dropdownOpen, toggle, updateSongIndex} = props;

    return (
        <div className={'band-selection-dropdown'}>
            <Dropdown className={'scheduleDropdownContainer'} isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle className={'toggle'} caret>
                    Songs
                </DropdownToggle>
                <DropdownMenu>
                    {
                        originalSongs.originalSongs.map(song => {
                            return (
                                <DropdownItem onClick={updateSongIndex}>
                                    {`${song.songName} - ${song.bandName}`}
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