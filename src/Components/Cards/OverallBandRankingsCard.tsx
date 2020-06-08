import React, {useEffect, useState} from 'react';
import {Alert, Button, Card} from 'reactstrap';
import {Title} from "../Title";
import {OriginalSongs} from "../../Pages/OriginalSongCompetition";
import {S3Client} from "../../aws/s3Client";
import {useAuth0} from "../../react-auth0-spa";
import OverallSongRankingsDropdownRow from "../OverallSongRankingsDropdownRow";
import OverallSongRankingsPersistanceRow from "../OverallSongRankingsPersistanceRow";
import {publishSNS} from "../../aws/publishSNS";

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
}
const s3Client = new S3Client();

const CALCULATE_SCORES_TOPIC_ARN = 'arn:aws:sns:us-east-1:771384749710:CalculateScoresForEachOriginalSongInWeekSnsTopic';

const OverallBandRankingsCard = (props: Props) => {
    const {originalSongs, week} = props;
    const initialSongRankings: SongRankings = {rankings: [], isFinalRanking: false};

    const [songRankings, setSongRankings] = useState(initialSongRankings);
    const {user} = useAuth0();

    const bandRankingsS3Key = `week=${week}/overall-song-rankings/${user.nickname.replace('.', '_')}.json`;

    useEffect(() => {
        const fetch = async () => {
            const loadedSongRankings = await s3Client.getObject(bandRankingsS3Key);

            setSongRankings(loadedSongRankings ? loadedSongRankings as SongRankings : initialSongRankings)
        };

        fetch();
    }, [week]);

    const [alert, setAlert] = useState({color: 'success', isOpen: false, message: []});
    const save = async (updatedSongRankings) => {

        await s3Client.put(
            s3Client.createPutPublicJsonRequest(
                'bitter-jester-test',
                bandRankingsS3Key,
                JSON.stringify(updatedSongRankings)
            )
        );

        await publishSNS({Message: `week=${week}`, TopicArn: CALCULATE_SCORES_TOPIC_ARN});
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