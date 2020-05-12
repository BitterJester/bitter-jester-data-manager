import React, {useEffect, useState} from 'react';
import {getFromS3} from '../aws/getFromS3';
import OriginalSongContainer from '../Containers/OriginalSongContainer';

type OriginalSong = {
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
    }

    const [originalSongs, setOriginalSongs] = useState(initialOriginalSongs);

    async function fetch(fileName) {
        await getFromS3(fileName, setOriginalSongs);
    }

    useEffect(() => {
        fetch('original-song-submissions.json');
    }, []);

    return (
        <OriginalSongContainer originalSongs={originalSongs}/>
    );
}

export default OriginalSongCompetition;