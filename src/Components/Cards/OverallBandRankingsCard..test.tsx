import React from 'react';
import {shallow} from 'enzyme';
import OverallBandRankingsCard from "./OverallBandRankingsCard";
import {Card, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {Title} from "../Title";
import {OriginalSongs} from "../../Pages/OriginalSongCompetition";

describe('OverallBandRankingsCard', () => {
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

    const component = shallow(<OverallBandRankingsCard originalSongs={originalSongs}/>);

    it('should have a card', () => {
        expect(component.find(Card)).toHaveLength(1);
    });

    it('should have a title', () => {
        expect(component.find(Title).props().titleDisplayText).toEqual('OVERALL SONG RANKINGS');
    });

    it('should render a dropdown', () => {
        expect(component.find(Dropdown).props().isOpen).toBeFalsy();
    });

    it('should render a dropdown toggle with no song selected', () => {
        expect(component.find(DropdownToggle).children().text()).toEqual('Please select your first place choice.');
    });

    it('should render a dropdown menu', () => {
        expect(component.find(DropdownMenu)).toHaveLength(1);
    });

    it('should render a dropdownItem for each original song', () => {
        expect(component.find(DropdownItem).children().text()).toEqual('songName - bandName');
    });

    it('should open the dropdown on toggle', () => {
        component.find(Dropdown).props().toggle(null);
        component.update();
        expect(component.find(Dropdown).props().isOpen).toBeTruthy();
    });

    it('should update title when item is selected', () => {
        component.find(DropdownItem).simulate('click');
        component.update();
        expect(component.find(DropdownToggle).children().text()).toEqual('songName - bandName')
    });
});