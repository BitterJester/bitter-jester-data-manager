import React, {useState} from 'react';
import {JudgesInfos, OriginalSongs} from "../Pages/OriginalSongCompetition";

import {Col, Row} from "reactstrap";
import ArtistStatementCollapseCard from "../Components/Cards/ArtistStatementCollapseCard";
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

    const judge = props.judgesInfo.judges.filter(judge => judge.emailAddress.toLowerCase() === user.email.toLowerCase())[0];
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
            <Row className={'original-song-info-row'}>
                <Col>
                    <OriginalSongJudgingFormCard bandName={bandName} songName={songName}/>
                </Col>
                <Col>
                    <OriginalSongInfoCard originalSongs={props.originalSongs}
                                          updateSelectedSong={setSongIndex}
                                          selectedIndex={songIndex}
                    />
                </Col>
            </Row>
            <Row className={'artist-statement-card-row'}>
                <Col>
                    <ArtistStatementCollapseCard originalSong={originalSong}/>
                </Col>
            </Row>
            <Row className={'overall-band-rankings-row'}>
                <Col>
                    <OverallBandRankingsCard originalSongs={props.originalSongs}/>
                </Col>
            </Row>
        </div>
    );
};

export default OriginalSongContainer;