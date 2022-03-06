import React, {useEffect, useState} from 'react';
import {getFromS3} from '../aws/getFromS3';
import OriginalSongContainer from '../containers/OriginalSongContainer';
import Page from "../Components/Page";
import {withRouter, useParams} from "react-router-dom";
import {useLocation} from "react-router";
import {UrlHelper} from "../utils/url-helper";
import {BitterJesterApiOriginalSongCompetitionRequest} from "../utils/api-requests/bitter-jester-api-original-song-competition-request";
import {useSelector} from "react-redux";
import {DataManagerReduxStore} from "../redux/data-manager-redux-store";

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
    const user = useSelector((state: DataManagerReduxStore) => {
        const userSession = state.signInUserSession;
        return {nickname: userSession.name, email: userSession.email};
    });
    const initialOriginalSongs: OriginalSongs = {
        originalSongs: []
    };

    const [originalSongs, setOriginalSongs] = useState(initialOriginalSongs);

    async function getSongSubmissions() {
        const apiRequest = new BitterJesterApiOriginalSongCompetitionRequest();
        const apps = await apiRequest.getOriginalSongCompetitionApplications();
        setOriginalSongs(apps);
    }

    useEffect(() => {
        getSongSubmissions();
    }, []);

    return (
        <Page>
            <OriginalSongContainer originalSongs={originalSongs} judgesInfo={user}
                                   setOriginalSongs={setOriginalSongs}/>
            <p>
                {'This tool was built by Spencer Kasper'}
            </p>
        </Page>
    );
};

export default withRouter(OriginalSongCompetition);