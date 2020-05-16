import React, {Fragment, useState} from 'react';
import {OriginalSongs} from "../Pages/OriginalSongCompetition";

import {Row} from "reactstrap";
import LyricsPdfCard from "../Components/Cards/LyricsPdfCard";
import OriginalSongInfoCard from "../Components/Cards/OriginalSongInfoCard";


type Props = {
    originalSongs: OriginalSongs;
}

const OriginalSongContainer = (props: Props) => {
    const [songIndex, setSongIndex] = useState(0);
    const originalSongs = props.originalSongs.originalSongs;
    const originalSong = originalSongs[songIndex];

    return (
        <Fragment>
            <Row style={{padding: '0 16px'}}>
                <OriginalSongInfoCard originalSongs={props.originalSongs}
                                      updateSelectedSong={setSongIndex}
                                      selectedIndex={songIndex}
                />
            </Row>
            <Row>
                <LyricsPdfCard originalSong={originalSong}/>
            </Row>
        </Fragment>
    );
};

export default OriginalSongContainer;