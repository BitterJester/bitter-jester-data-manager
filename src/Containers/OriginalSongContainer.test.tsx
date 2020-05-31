import React from 'react';
import {shallow} from 'enzyme';
import OriginalSongContainer from "./OriginalSongContainer";
import {OriginalSongs} from "../Pages/OriginalSongCompetition";
import OriginalSongInfoCard from "../Components/Cards/OriginalSongInfoCard";
import ArtistStatementCollapseCard from "../Components/Cards/ArtistStatementCollapseCard";

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

describe('OriginalSongContainer', () => {

    const component = shallow(<OriginalSongContainer originalSongs={originalSongs}/>);

    describe('OriginalSongInfoCard', () => {
        const props = component.find(OriginalSongInfoCard).props();
        it('should pass originalSong', () => {
            expect(props.originalSongs).toEqual(originalSongs);
        });

        it('should pass selectedIndex', () => {
            expect(props.selectedIndex).toEqual(0);
        });
    });

    it('should pass first song to lyrics pdf card', () => {
        expect(component.find(ArtistStatementCollapseCard).props().originalSong).toEqual(originalSongs.originalSongs[0]);
    });
});