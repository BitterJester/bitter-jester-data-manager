import React, {useState} from 'react';
import ConfirmationCheckbox from "./ConfirmationCheckbox";
import {Button, Row} from "reactstrap";
import {S3Client} from "../aws/s3Client";
import {SongRankings} from "./Cards/OverallBandRankingsCard";

const s3Client = new S3Client();

type Props = {
    songRankings: SongRankings;
    setAlert: Function;
    bandRankingsS3Key: string;
}

const OverallSongRankingsPersistanceRow = (props: Props) => {
    const {songRankings, setAlert, bandRankingsS3Key} = props;

    const generateAnyNecessaryErrors = () => {
        const rankings = songRankings.rankings;
        const hasDuplicateSongs = rankings
            .map(placement => placement.songName)
            .filter((value, index, array) => array.indexOf(value) === index)
            .length !== rankings.length;

        const NUMBER_OF_PLACES = 3;
        const hasEmptyPlaces = rankings.length < NUMBER_OF_PLACES;

        const errorMessages = ['NOT SUBMITTED'];

        if (hasDuplicateSongs) {
            errorMessages.push('You may not choose a song more than once.');
        }

        if (hasEmptyPlaces) {
            errorMessages.push('You may not leave any places empty.');
        }

        if (!hasListenedToAllSongs) {
            errorMessages.push('You must confirm you have listened to all songs before clicking "Submit".')
        }

        return hasDuplicateSongs || hasEmptyPlaces || !hasListenedToAllSongs ? errorMessages : [];
    };

    const save = async (updatedSongRankings) => {
        await s3Client.put(
            s3Client.createPutPublicJsonRequest(
                'bitter-jester-test',
                bandRankingsS3Key,
                JSON.stringify(updatedSongRankings)
            )
        );
        setAlert({color: 'success', isOpen: true, message: ['Successfully submitted your rankings.']});
    };

    const submitBandRankings = async () => {
        const errorMessages = generateAnyNecessaryErrors();
        if (errorMessages.length === 0) {
            await save({...songRankings, isFinalRanking: true});
        } else {
            setAlert({color: 'danger', isOpen: true, message: errorMessages});
        }
    };

    const isFinalRanking = songRankings.isFinalRanking;
    const [hasListenedToAllSongs, setHasListenedToAllSongs] = useState(isFinalRanking);

    return (
        <div style={{paddingTop: '48px'}}>
            <ConfirmationCheckbox
                disabled={isFinalRanking}
                toggleCheckBox={() => setHasListenedToAllSongs(!hasListenedToAllSongs)}
                isChecked={hasListenedToAllSongs}/>
            <Row style={{paddingLeft: '12px'}}>
                <div className={'button-container'}>
                    <Button className={'submit-button'}
                            onClick={() => save(songRankings)}
                            disabled={isFinalRanking}
                            style={{paddingRight: '8px'}}>
                        Save Current Rankings
                    </Button>
                </div>
                <div className={'button-container'}>
                    <Button className={'submit-button'}
                            onClick={submitBandRankings}
                            disabled={isFinalRanking}>
                        Submit Overall Rankings
                    </Button>
                </div>
            </Row>
        </div>
    );
};

export default OverallSongRankingsPersistanceRow;