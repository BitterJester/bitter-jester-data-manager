import React, {useState} from 'react';
import {JudgesInfos, OriginalSongs} from "../Pages/OriginalSongCompetition";

import {Col, Row} from "reactstrap";
import LyricsPdfCard from "../Components/Cards/LyricsPdfCard";
import OriginalSongInfoCard from "../Components/Cards/OriginalSongInfoCard";
import OriginalSongJudgingFormCard from "../Components/Cards/OriginalSongJudgingFormCard";
import OverallBandRankingsCard from "../Components/Cards/OverallBandRankingsCard";
import {useAuth0} from "../react-auth0-spa";

type Props = {
    originalSongs: OriginalSongs;
    judgesInfo: JudgesInfos;
    setOriginalSongs: Function;
}

const OriginalSongContainer = (props: Props) => {
    const [songIndex, setSongIndex] = useState(0);
    const originalSongs = props.originalSongs.originalSongs;
    const originalSong = originalSongs[songIndex];
    const bandName = originalSong ? originalSong.bandName : '';
    const songName = originalSong ? originalSong.songName : '';
    const {user} = useAuth0();

    const judge = props.judgesInfo.judges.filter(judge => judge.emailAddress === user.email)[0];
    if (judge && originalSongs) {
        const songsForJudgesWeek = originalSongs.filter(song => {
            return song.scheduledWeek === judge.week;
        });
        if (originalSongs.length > songsForJudgesWeek.length) {
            props.setOriginalSongs(
                {
                    originalSongs: songsForJudgesWeek
                }
            );
        }
    }

    return (
        <div className={'original-song-competition-container'}>
            <Row className={'overall-band-rankings-row'}>
                <Col>
                    <OverallBandRankingsCard originalSongs={props.originalSongs}/>
                </Col>
            </Row>
            <Row className={'original-song-info-row'}>
                <Col>
                    <OriginalSongInfoCard originalSongs={props.originalSongs}
                                          updateSelectedSong={setSongIndex}
                                          selectedIndex={songIndex}
                    />
                </Col>
                <Col>
                    <OriginalSongJudgingFormCard bandName={bandName} songName={songName}/>
                </Col>
            </Row>
            <Row className={'lyrics-card-row'}>
                <Col>
                    <LyricsPdfCard originalSong={originalSong}/>
                </Col>
            </Row>
        </div>
    );
};

export default OriginalSongContainer;