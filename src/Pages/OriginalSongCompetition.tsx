import React, { useState, useEffect, Fragment } from 'react';
import { getFromS3 } from '../aws/getFromS3';
import ReactAudioPlayer from 'react-audio-player';

const OriginalSongCompetition = () => {
    type OriginalSong = {
        songName: string,
        bandName: string,
        primaryEmailAddress: string,
        songUrl: string,
        bandPhotoUrl: string
    }

    type OriginalSongs = {
        originalSongs: OriginalSong[]
    }

    const initialOriginalSongs: OriginalSongs = {
        originalSongs: []
    }

    const [originalSongs, setOriginalSongs] = useState(initialOriginalSongs);

    async function fetch(fileName) {
        await getFromS3(fileName, setOriginalSongs);
    }

    useEffect(() => {
        fetch('original-song-submissions.json');
    }, []);
    
return (
    <Fragment>
        {
            originalSongs.originalSongs.map(song => {
                return <div>
                    <div>
                        {song.songName}
                    </div>
        
                    <div>
                        {song.bandName}
                    </div>
        
                    <div>
                        <ReactAudioPlayer src={song.songUrl} controls/>
                    </div>
                </div>
            })
        }
    </Fragment>
)
}

export default OriginalSongCompetition;