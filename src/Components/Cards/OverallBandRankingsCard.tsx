import React, {useEffect, useState} from 'react';
import {Alert, Card} from 'reactstrap';
import {Title} from "../Title";
import {OriginalSongs} from "../../Pages/OriginalSongCompetition";
import {S3Client} from "../../aws/s3Client";
import {useAuth0} from "../../react-auth0-spa";
import OverallSongRankingsDropdownRow from "../OverallSongRankingsDropdownRow";
import OverallSongRankingsPersistanceRow from "../OverallSongRankingsPersistanceRow";

type Props = {
    originalSongs: OriginalSongs;
}

export type SongRanking = {
    firstPlace?: {
        songName: string;
        bandName: string;
        value: 3;
    },
    secondPlace?: {
        songName: string;
        bandName: string;
        value: 2;
    },
    thirdPlace?: {
        songName: string;
        bandName: string;
        value: 1;
    }
}
const s3Client = new S3Client();

const OverallBandRankingsCard = (props: Props) => {
    const {originalSongs} = props;
    const [songRankings, setSongRankings] = useState({} as SongRanking);

    const {user} = useAuth0();
    const bandRankingsS3Key = `overall-song-rankings/${user.nickname.replace('.', '_')}.json`;

    useEffect(() => {
        const fetch = async () => {
            const loadedSongRankings = await s3Client.getObject(bandRankingsS3Key);

            if (loadedSongRankings) {
                setSongRankings(loadedSongRankings)
            }
        };

        fetch();
    }, []);

    const [alert, setAlert] = useState({color: 'success', isOpen: false, message: []});

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
            <OverallSongRankingsDropdownRow
                originalSongs={originalSongs}
                songRankings={songRankings}
                setSongRankings={setSongRankings}/>
            <OverallSongRankingsPersistanceRow bandRankingsS3Key={bandRankingsS3Key} setAlert={setAlert}
                                               songRankings={songRankings}/>
        </Card>
    );
};

export default OverallBandRankingsCard;