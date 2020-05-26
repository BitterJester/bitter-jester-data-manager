import React, {useState} from 'react';
import {OriginalSongs} from "../Pages/OriginalSongCompetition";

import {Col, Row} from "reactstrap";
import LyricsPdfCard from "../Components/Cards/LyricsPdfCard";
import OriginalSongInfoCard from "../Components/Cards/OriginalSongInfoCard";
import OriginalSongJudgingFormCard from "../Components/Cards/OriginalSongJudgingFormCard";
import OverallBandRankingsCard from "../Components/Cards/OverallBandRankingsCard";

type Props = {
    originalSongs: OriginalSongs;
}

const OriginalSongContainer = (props: Props) => {
    const [songIndex, setSongIndex] = useState(0);
    const originalSongs = props.originalSongs.originalSongs;
    const originalSong = originalSongs[songIndex];
    const bandName = originalSong ? originalSong.bandName : '';
    const songName = originalSong ? originalSong.songName : '';

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