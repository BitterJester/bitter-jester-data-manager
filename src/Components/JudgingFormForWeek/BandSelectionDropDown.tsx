import React from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {OriginalSong, OriginalSongs} from "../../pages/OriginalSongCompetition";
import {OnClickFunction} from "../SortIncompleteApplicationsDropdown";
import {dropdownMenuModifiers} from '../../utils/dropdownMenuModifiers';

type Props = {
    dropdownOpen: boolean;
    toggle: OnClickFunction;
    originalSongs: OriginalSongs;
    updateSongIndex: OnClickFunction;
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
                <DropdownMenu modifiers={dropdownMenuModifiers}>
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