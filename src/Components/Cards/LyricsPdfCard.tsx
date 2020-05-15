import React from 'react';
import {Card} from "reactstrap";
import {Title} from "../Title";
import {OriginalSong} from "../../Pages/OriginalSongCompetition";
import {Document, Page, pdfjs} from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type Props = {
    originalSong: OriginalSong;
};

const LyricsPdfCard = (props: Props) => {
    const {originalSong} = props;
    const songName = originalSong ? originalSong.songName : '';
    const lyricsUrl = originalSong ? originalSong.lyricsUrl : '';

    return (
        <div style={{padding: '16px'}}>
            <Card>
                <div>
                    <Title titleDisplayText={songName}/>
                </div>
                <Document file={lyricsUrl}
                          onLoadError={console.error}
                          onLoadSuccess={({numPages}) => console.log(numPages)}
                >
                    <Page pageNumber={1}/>
                </Document>
            </Card>
        </div>
    );
};

export default LyricsPdfCard;