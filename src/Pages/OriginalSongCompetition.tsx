import React, {useEffect, useState} from 'react';
import {getFromS3} from '../aws/getFromS3';
import OriginalSongContainer from '../Containers/OriginalSongContainer';
import Page from "../Components/Page";

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
        <Page>
            <OriginalSongContainer originalSongs={originalSongs}/>
            <p>
                {'This tool was built by Spencer Kasper'}
            </p>
        </Page>
    );
};

export default OriginalSongCompetition;