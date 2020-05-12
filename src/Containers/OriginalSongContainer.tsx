import React, {useState} from 'react';
import {OriginalSongs} from "../Pages/OriginalSongCompetition";
import {Title} from "../Components/Title";
import ReactAudioPlayer from 'react-audio-player';

type Props = {
    originalSongs: OriginalSongs;
}

const OriginalSongContainer = (props: Props) => {
    const [songIndex, setSongIndex] = useState(0);
    const originalSongs = props.originalSongs.originalSongs;
    const hasSongs = originalSongs.length;
    const bandPhotoUrl = hasSongs ? originalSongs[songIndex].bandPhotoUrl : '';
    const songUrl = hasSongs ? originalSongs[songIndex].songUrl : '';

    const updateSongIndex = (plusOrMinusOne: 1 | -1) => {
        const newSongIndex = songIndex + plusOrMinusOne;
        const maximumSongIndex = originalSongs.length - 1;

        if (newSongIndex > maximumSongIndex) {
            setSongIndex(0);
        }

        else if (newSongIndex < 0){
            setSongIndex(maximumSongIndex);
        }

        else {
            setSongIndex(newSongIndex);
        }
    };

    return (
        <div style={{textAlign: 'center'}}>
            <Title titleDisplayText={'Original Song Submissions'}/>
            <div>
                <div style={{display: "inline-block"}}>
                    <button onClick={() => updateSongIndex(-1)}>{'<'}</button>
                </div>
                <div style={{display: "inline-block"}}>
                    <img height={800} src={bandPhotoUrl} alt={'failed'}/>
                </div>
                <div style={{display: "inline-block"}}>
                    <button onClick={() => updateSongIndex(1)}>{'>'}</button>
                </div>
            </div>
            <div className={'band-name-text-container'}>
                {hasSongs ? originalSongs[songIndex].bandName : ''}
            </div>
            <div>
                <ReactAudioPlayer src={songUrl} controls/>
            </div>
        </div>
    );
};

export default OriginalSongContainer;