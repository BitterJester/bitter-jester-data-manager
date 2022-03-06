import React, {useEffect, useState} from 'react';
import {Alert, Button, Card} from 'reactstrap';
import {Title} from "../Title";
import {OriginalSongs} from "../../pages/OriginalSongCompetition";
import {S3Client} from "../../aws/s3Client";
import OverallSongRankingsDropdownRow from "../JudgingFormForWeek/OverallSongRankingsDropdownRow";
import OverallSongRankingsPersistanceRow from "../JudgingFormForWeek/OverallSongRankingsPersistanceRow";
import {Judge} from "./OriginalSongJudgingFormCard";
import {BitterJesterApiOriginalSongCompetitionRequest} from "../../utils/api-requests/bitter-jester-api-original-song-competition-request";

type Props = {
    originalSongs: OriginalSongs;
    week: number;
}

export type SongRanking = {
    placement: number;
    placementName: string;
    songName?: string | undefined;
    bandName?: string | undefined;
    value: number;
}

export type SongRankings = {
    rankings: SongRanking[];
    isFinalRanking: boolean;
    judge: Judge;
}

const OverallBandRankingsCard = (props: Props) => {
    const {originalSongs, week} = props;
    const user = {email: '', nickname: ''}
    const judge = {email: user.email, nickname: user.nickname};

    const initialSongRankings: SongRankings = {rankings: [], isFinalRanking: false, judge};
    const [songRankings, setSongRankings] = useState(initialSongRankings);

    useEffect(() => {
    }, [week]);
    const [alert, setAlert] = useState({color: 'success', isOpen: false, message: []});
    const save = async (updatedSongRankings) => {
        const apiRequest = new BitterJesterApiOriginalSongCompetitionRequest();
        const response = await apiRequest.updateOverallRankingsForWeek(updatedSongRankings);
        console.error(response);
    };

    return (
        <Card className={'overall-band-rankings-card'}>
            <Alert isOpen={alert.isOpen} color={alert.color} toggle={() => setAlert({...alert, isOpen: !alert.isOpen})}>
                {alert.message.map((messageItem, index) => {
                    return (
                        <div key={index}>
                            {messageItem}
                        </div>
                    )
                })}
            </Alert>
            <Title titleDisplayText={'OVERALL SONG RANKINGS'}/>
            <div className={'ranking-instructions'}>
                <p>
                    {
                        'This is where you decide your winners for the week you are judging. ' +
                        'Please save your rankings often! ' +
                        'Once you have listened to every song and have left all of your comments for all of the songs, ' +
                        'check the box at the bottom of this card and click "Submit Overall Rankings".'
                    }
                </p>
                <p className={'warning'}>
                    {
                        'NOTE: Once you click "Submit Overall Rankings", you will not be able to change your rankings. ' +
                        'You will, however, be able to come back and update your comments for each of the bands.'
                    }
                </p>
            </div>
            <div className={'button-container'}>
                <Button className={'submit-button'}
                        onClick={async () => {
                            await save(songRankings);
                            setAlert({isOpen: true, color: 'success', message: ['Successfully saved your rankings.']})
                        }}
                        disabled={songRankings.isFinalRanking}
                        style={{padding: '8px'}}>
                    Save Current Rankings
                </Button>
            </div>
            <OverallSongRankingsDropdownRow
                originalSongs={originalSongs}
                songRankings={songRankings}
                setSongRankings={setSongRankings}/>
            <OverallSongRankingsPersistanceRow
                save={save}
                setAlert={setAlert}
                songRankings={songRankings}/>
        </Card>
    );
};

export default OverallBandRankingsCard;