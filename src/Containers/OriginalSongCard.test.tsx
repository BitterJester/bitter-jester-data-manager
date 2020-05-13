import React from 'react';
import {shallow} from 'enzyme';
import OriginalSongCard from "./OriginalSongCard";
import {OriginalSongs} from "../Pages/OriginalSongCompetition";
import {Title} from "../Components/Title";
import ReactAudioPlayer from 'react-audio-player';

describe('OriginalSongCard', () => {
    const originalSongs: OriginalSongs = {
        originalSongs: [
            {
                bandName: 'bandName',
                bandPhotoUrl: 'url',
                songName: 'songName',
                songUrl: 'songUrl',
                primaryEmailAddress: 'email',
                lyricsUrl: 'lyricsUrl'
            }
        ]
    };

    const component = shallow(<OriginalSongCard originalSongs={originalSongs}/>);

    describe('Band Photo', () => {
        it('should pass bandPhotoUrl', () => {
            expect(component.find('img').props().src).toEqual('url');
        });

        it('should pass height', () => {
            expect(component.find('img').props().height).toEqual(400);
        });
    });

    it('should display band name', function () {
        expect(component.find(Title).props().titleDisplayText).toEqual('bandName');
    });

    it('should render the band song', () => {
        // @ts-ignore
        expect(component.find(ReactAudioPlayer).props().src).toEqual('songUrl');
    });
});