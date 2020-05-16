import React, {useEffect, useState} from 'react';
import {getFromS3} from '../aws/getFromS3';
import OriginalSongContainer from '../Containers/OriginalSongContainer';
import {Alert} from "reactstrap";

export type OriginalSong = {
    songDescription: string;
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
        <div className={'original-song-competition-container'}>
            <Alert className={'judging-reminder-alert'} color={'danger'}>
                Reminder: You are not providing feedback on the recording quality of submissions. Please focus on the
                music, lyrics, performance, etc.
            </Alert>
            <div className={'original-song-container'}>
                <OriginalSongContainer originalSongs={originalSongs}/>
            </div>
        </div>
    );
};

export default OriginalSongCompetition;