import React, {Fragment, useState} from 'react';
import {OriginalSongs} from "../Pages/OriginalSongCompetition";

import {Col, Row} from "reactstrap";
import LyricsPdfCard from "../Components/Cards/LyricsPdfCard";
import OriginalSongInfoCard from "../Components/Cards/OriginalSongInfoCard";
import OriginalSongJudgingFormCard from "../Components/Cards/OriginalSongJudgingFormCard";

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
        <Fragment>
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
        </Fragment>
    );
};

export default OriginalSongContainer;