import React from 'react';
import OriginalSongInfoCard from "./OriginalSongInfoCard";
import {shallow} from "enzyme";
import {OriginalSongs} from "../../pages/OriginalSongCompetition";
import {Title} from "../Title";
import BandSelectionDropDown from "../JudgingFormForWeek/BandSelectionDropDown";

describe('OriginalSongInfoCard - Initial', () => {
    const originalSongs: OriginalSongs = {
        originalSongs: [
            {
                bandName: 'bandName',
                bandPhotoUrl: 'url',
                songName: 'songName',
                songUrl: 'songUrl',
                primaryEmailAddress: 'email',
                lyricsUrl: 'lyricsUrl',
                songDescription: 'songDescription'
            }
        ]
    };

    const component = shallow(<OriginalSongInfoCard originalSongs={originalSongs}
                                                    selectedIndex={0}
                                                    updateSelectedSong={jest.fn()}/>);

    it('should have a title', () => {
        expect(component.find(Title).props().titleDisplayText).toEqual('SONG INFO');
    });


    describe('BandSelectionDropDown', () => {
        const bandSelectionDropDownProps = component.find(BandSelectionDropDown).props();

        it('should pass originalSongs', () => {
            expect(bandSelectionDropDownProps.originalSongs).toEqual(originalSongs);
        });

        it('should pass dropdownOpen as closed', () => {
            expect(bandSelectionDropDownProps.dropdownOpen).toBeFalsy();
        });

        it('should have a toggle function', () => {
            bandSelectionDropDownProps.toggle(null);
            component.update();
            expect(component.find(BandSelectionDropDown).props().dropdownOpen).toBeTruthy();
        });
    });
});
