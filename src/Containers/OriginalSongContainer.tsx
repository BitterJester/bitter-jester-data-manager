import React, {useState} from 'react';
import {OriginalSongs} from "../Pages/OriginalSongCompetition";
import {Title} from "../Components/Title";
import ReactAudioPlayer from 'react-audio-player';
import {Card} from "reactstrap";

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
        } else if (newSongIndex < 0) {
            setSongIndex(maximumSongIndex);
        } else {
            setSongIndex(newSongIndex);
        }
    };

    return (
        <Card style={{width: '35%'}}>
            <Title titleDisplayText={hasSongs ? originalSongs[songIndex].bandName : ''}/>
            <div>
                <div style={{display: "inline-block", padding: '0px 16px'}}>
                    <button onClick={() => updateSongIndex(-1)}>{'<'}</button>
                </div>
                <div style={{display: "inline-block"}}>
                    <img height={400} src={bandPhotoUrl} alt={'Band could not be loaded'}/>
                </div>
                <div style={{display: "inline-block", padding: '0px 16px'}}>
                    <button onClick={() => updateSongIndex(1)}>{'>'}</button>
                </div>
            </div>
            <div style={{padding: '8px', textTransform: "uppercase", fontSize: '20px'}}
                 className={'band-name-text-container'}>

            </div>
            <div style={{padding: '8px'}}>
                <ReactAudioPlayer src={songUrl} controls/>
            </div>
        </Card>
    );
};

export default OriginalSongContainer;