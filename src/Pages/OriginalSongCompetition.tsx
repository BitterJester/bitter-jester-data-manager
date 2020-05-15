import React, {useEffect, useState} from 'react';
import {getFromS3} from '../aws/getFromS3';
import OriginalSongCard from '../Containers/OriginalSongCard';
import {Alert} from "reactstrap";

export type OriginalSong = {
    lyricsUrl: string;
    songName: string,
    bandName: string,
    primaryEmailAddress: string,
    songUrl: string,
    bandPhotoUrl: string
}

export type OriginalSongs = {
    originalSongs: OriginalSong[]
}

const OriginalSongCompetition = () => {
    const initialOriginalSongs: OriginalSongs = {
        originalSongs: []
    };

    const [originalSongs, setOriginalSongs] = useState(initialOriginalSongs);

    async function fetch(fileName) {
        await getFromS3(fileName, setOriginalSongs);
    }

    useEffect(() => {
        fetch('original-song-submissions.json');
    }, []);

    return (
        <div style={{background: 'rgb(232, 231, 228)'}}>
            <Alert style={{textAlign: "center"}} color={'danger'}>
                Reminder: You are not providing feedback on the recording quality of submissions. Please focus on the
                music, lyrics, performance, etc.
            </Alert>
            <div style={{textAlign: 'center', padding: '16px'}}>
                <OriginalSongCard originalSongs={originalSongs}/>
            </div>
        </div>
    );
};

export default OriginalSongCompetition;