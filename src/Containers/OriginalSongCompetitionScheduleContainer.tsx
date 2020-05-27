import React, {useEffect, useState} from 'react';
import OriginalSongCompetitionScheduleCard from "../Components/Cards/OriginalSongCompetitionScheduleCard";
import {Container} from 'reactstrap';
import {getFromS3} from "../aws/getFromS3";
import {OriginalSongs} from "../Pages/OriginalSongCompetition";

const OriginalSongCompetitionScheduleContainer = () => {
    const initialOriginalSongs: OriginalSongs = {
        originalSongs: []
    };
    const [originalSongSubmissions, setOriginalSongSubmissions] = useState(initialOriginalSongs);

    useEffect(() => {
        const fetch = async () => {
            await getFromS3('original-song-submissions.json', setOriginalSongSubmissions);
        };

        fetch();
    }, []);

    return (
        <Container fluid>
            <OriginalSongCompetitionScheduleCard originalSongSubmissions={originalSongSubmissions}/>
        </Container>
    );
};

export default OriginalSongCompetitionScheduleContainer;