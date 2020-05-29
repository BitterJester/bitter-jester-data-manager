import React from 'react';
import ConfirmationCheckbox from "./ConfirmationCheckbox";
import {Button, Row} from "reactstrap";
import {S3Client} from "../aws/s3Client";
import {SongRanking} from "./Cards/OverallBandRankingsCard";

const s3Client = new S3Client();

type Props = {
    songRankings: SongRanking;
    setAlert: Function;
    bandRankingsS3Key: string;
}

const OverallSongRankingsPersistanceRow = (props: Props) => {
    const {songRankings, setAlert, bandRankingsS3Key} = props;

    const generateAnyNecessaryErrors = () => {
        const songPlacements = Object.values(songRankings)
            .filter(placement => placement);

        const duplicateSongs = songPlacements
            .map(placement => placement.songName)
            .filter((value, index, array) => array.indexOf(value) === index)
            .length !== songPlacements.length;

        const NUMBER_OF_PLACES = 3;
        const emptyPlaces = songPlacements.length < NUMBER_OF_PLACES;

        const errorMessages = ['NOT SUBMITTED']

        if (duplicateSongs) {
            errorMessages.push('You may not choose a song more than once.');
        }

        if (emptyPlaces) {
            errorMessages.push('You may not leave any places empty.');
        }

        return duplicateSongs || emptyPlaces ? errorMessages : [];
    };

    const save = async () => {
        await s3Client.put(
            s3Client.createPutPublicJsonRequest(
                'bitter-jester-test',
                bandRankingsS3Key,
                JSON.stringify(songRankings)
            )
        );
        setAlert({color: 'success', isOpen: true, message: ['Successfully submitted your rankings.']});
    };

    const submitBandRankings = async () => {
        const errorMessages = generateAnyNecessaryErrors();
        if (errorMessages.length === 0) {
            await save();
        } else {
            setAlert({color: 'danger', isOpen: true, message: errorMessages});
        }
    };

    return (
        <div style={{paddingTop: '48px'}}>
            <ConfirmationCheckbox/>
            <Row style={{padding: '16px 0 0 32px'}}>
                <div>
                    <Button className={'submit-button'} onClick={save} style={{paddingRight: '8px'}}>
                        Save
                    </Button>
                </div>
                <div className={'button-container'}>
                    <Button className={'submit-button'} onClick={submitBandRankings}>
                        Submit
                    </Button>
                </div>
            </Row>
        </div>
    );
};

export default OverallSongRankingsPersistanceRow;