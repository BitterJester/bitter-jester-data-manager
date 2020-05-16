import React from 'react';
import {Title} from "../Title";
import {Card} from "reactstrap";
import {OriginalSongs} from "../../Pages/OriginalSongCompetition";
import ReactAudioPlayer from 'react-audio-player';

type Props = {
    originalSongs: OriginalSongs;
    updateSelectedSong: Function;
    selectedIndex: number;
}

const OriginalSongInfoCard = (props: Props) => {
    const {originalSongs, updateSelectedSong, selectedIndex} = props;
    const unwrappedOriginalSongs = originalSongs.originalSongs;
    const hasSongs = unwrappedOriginalSongs.length;
    const originalSong = unwrappedOriginalSongs[selectedIndex];
    const songDescription = hasSongs ? originalSong.songDescription : '';
    const songUrl = hasSongs ? originalSong.songUrl : '';

    const updateSongIndex = (plusOrMinusOne: 1 | -1) => {
        const newSongIndex = selectedIndex + plusOrMinusOne;
        const maximumSongIndex = unwrappedOriginalSongs.length - 1;

        if (newSongIndex > maximumSongIndex) {
            updateSelectedSong(0);
        } else if (newSongIndex < 0) {
            updateSelectedSong(maximumSongIndex);
        } else {
            updateSelectedSong(newSongIndex);
        }
    };
    return (
        <Card style={{width: '50%'}}>
            <div style={{padding: '16px'}}>
                <Title titleDisplayText={hasSongs ? originalSong.bandName : ''}/>
                <div style={{padding: '8px', display: 'block'}}>
                    <ReactAudioPlayer src={songUrl} controls/>
                </div>
                <div style={{textAlign: "left"}}>
                    <h5>SONG DESCRIPTION</h5>
                    <p>
                        {songDescription}
                    </p>
                </div>
                <div style={{display: 'block'}}>
                    <div style={{display: 'inline-block', padding: '0px 16px'}}>
                        <button onClick={() => updateSongIndex(-1)}>{'<'}</button>
                    </div>
                    <div style={{display: 'inline-block', padding: '0px 16px'}}>
                        <button onClick={() => updateSongIndex(1)}>{'>'}</button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default OriginalSongInfoCard;