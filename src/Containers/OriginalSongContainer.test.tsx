import React from 'react';
import {shallow} from 'enzyme';
import OriginalSongContainer from "./OriginalSongContainer";
import {OriginalSongs} from "../Pages/OriginalSongCompetition";
import {Title} from "../Components/Title";
import ReactAudioPlayer from 'react-audio-player';

describe('OriginalSongContainer', () => {
    const originalSongs: OriginalSongs = {
        originalSongs: [
            {
                bandName: 'bandName',
                bandPhotoUrl: 'url',
                songName: 'songName',
                songUrl: 'songUrl',
                primaryEmailAddress: 'email'
            }
        ]
    };

    const component = shallow(<OriginalSongContainer originalSongs={originalSongs}/>);

    it('should render a title', () => {
        expect(component.find(Title).props().titleDisplayText).toEqual('Original Song Submissions');
    });

    describe('Band Photo', () => {
        it('should pass bandPhotoUrl', () => {
            expect(component.find('img').props().src).toEqual('url');
        });

        it('should pass height', () => {
            expect(component.find('img').props().height).toEqual(400);
        });
    });

    it('should display band name', function () {
        expect(component.find('.band-name-text-container').text()).toEqual('bandName');
    });

    it('should render the band song', () => {
        // @ts-ignore
        expect(component.find(ReactAudioPlayer).props().src).toEqual('songUrl');
    });
});