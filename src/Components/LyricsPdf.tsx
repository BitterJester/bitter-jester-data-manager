import React, {useState} from 'react';
import {OriginalSong} from "../Pages/OriginalSongCompetition";
import {Document, Page, pdfjs} from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


type Props = {
    originalSong: OriginalSong;
}

const LyricsPdf = (props: Props) => {
    const {originalSong} = props;
    const lyricsUrl = originalSong ? originalSong.lyricsUrl : '';

    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div>
            <h3>Lyrics</h3>
            <div>
                {`Page ${currentPage} / ${totalPages}`}
            </div>
            <Document file={lyricsUrl}
                      onLoadError={console.error}
                      onLoadSuccess={({numPages}) => setTotalPages(numPages)}
            >
                <Page pageNumber={currentPage} wrap/>
            </Document>
        </div>
    );
};

export default LyricsPdf;