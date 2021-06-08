import React, {useEffect, useState} from 'react';
import {getFromS3} from '../aws/getFromS3';
import OriginalSongContainer from '../containers/OriginalSongContainer';
import Page from "../Components/Page";
import {withRouter, useParams} from "react-router-dom";
import {useLocation} from "react-router";
import {UrlHelper} from "../utils/url-helper";

export type OriginalSong = {
    songDescription: string;
    lyricsUrl: string;
    songName: string;
    bandName: string;
    primaryEmailAddress: string;
    songUrl: string;
    bandPhotoUrl: string;
    scheduledWeek?: number | undefined;
    scheduledWeeks?: number[];
    vimeoId?: number | string | undefined;
}

export type OriginalSongs = {
    originalSongs: OriginalSong[]
}

export type JudgesInfo = {
    id?: number;
    week?: number;
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    theirDeal: string;
}

export type JudgesInfos = {
    judges: JudgesInfo[];
}

const OriginalSongCompetition = () => {
    const initialOriginalSongs: OriginalSongs = {
        originalSongs: []
    };

    const [originalSongs, setOriginalSongs] = useState(initialOriginalSongs);

    const initialJudgesInfo: JudgesInfos = {
        judges: []
    };

    const [judgesInfo, setJudgesInfo] = useState(initialJudgesInfo);

    async function fetch(fileName, setState) {
        await getFromS3(fileName, setState);
    }

    useEffect(() => {
        fetch('original-song-submissions.json', setOriginalSongs);
    }, []);

    useEffect(() => {
        fetch('judges-info.json', setJudgesInfo);
    }, []);

    return (
        <Page>
            <OriginalSongContainer originalSongs={originalSongs} judgesInfo={judgesInfo}
                                   setOriginalSongs={setOriginalSongs}/>
            <p>
                {'This tool was built by Spencer Kasper'}
            </p>
        </Page>
    );
};

export default withRouter(OriginalSongCompetition);