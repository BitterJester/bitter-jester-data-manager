import React, {useState} from 'react';
import {OriginalSongs} from "../Pages/OriginalSongCompetition";
import {Title} from "../Components/Title";
import ReactAudioPlayer from 'react-audio-player';
import {Card, Col, Row} from "reactstrap";
import {Document, Page} from 'react-pdf/dist/entry.webpack';

type Props = {
    originalSongs: OriginalSongs;
}

const OriginalSongCard = (props: Props) => {
    const [songIndex, setSongIndex] = useState(0);
    const originalSongs = props.originalSongs.originalSongs;
    const hasSongs = originalSongs.length;
    const bandPhotoUrl = hasSongs ? originalSongs[songIndex].bandPhotoUrl : '';
    const songUrl = hasSongs ? originalSongs[songIndex].songUrl : '';
    const lyricsUrl = hasSongs ? originalSongs[songIndex].lyricsUrl : '';

    const updateSongIndex = (plusOrMinusOne: 1 | -1) => {
        const newSongIndex = songIndex + plusOrMinusOne;
        const maximumSongIndex = originalSongs.length - 1;

        if (newSongIndex > maximumSongIndex) {
            setSongIndex(0);
        } else if (newSongIndex < 0) {
            setSongIndex(maximumSongIndex);
        } else {
            setSongIndex(newSongIndex);
        }
    };

    return (
        <Card style={{width: '100%'}}>
            <Row>
                <Col style={{
                    display: 'flex',
                    alignContent: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                }}>
                    <Title titleDisplayText={hasSongs ? originalSongs[songIndex].bandName : ''}/>
                    <div style={{display: 'block'}}>
                        <div style={{display: 'inline-block', padding: '0px 16px'}}>
                            <button onClick={() => updateSongIndex(-1)}>{'<'}</button>
                        </div>
                        <div style={{display: 'inline-block'}}>
                            <img height={400} src={bandPhotoUrl} alt={'Band could not be loaded'}/>
                        </div>
                        <div style={{display: 'inline-block', padding: '0px 16px'}}>
                            <button onClick={() => updateSongIndex(1)}>{'>'}</button>
                        </div>
                    </div>
                    <div style={{padding: '8px', display: 'block'}}>
                        <ReactAudioPlayer src={songUrl} controls/>
                    </div>
                </Col>
                <Col style={{
                    display: 'flex',
                    alignContent: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                }}>
                    <Document file={lyricsUrl}
                              onLoadError={console.error}
                              onLoadSuccess={({numPages}) => console.log(numPages)}
                    >
                        <Page pageNumber={1}/>
                    </Document>
                </Col>
            </Row>
        </Card>
    );
};

export default OriginalSongCard;