import React, {Fragment} from 'react';
import {Button} from 'reactstrap';
import _ from 'lodash';
import {S3Client} from "../aws/s3Client";
import {OriginalSongs} from "../Pages/OriginalSongCompetition";

type Props = {
    originalSongs: OriginalSongs,
    onAlert: Function
}

const SaveOriginalSongScheduleButton = (props: Props) => {
    const {originalSongs, onAlert} = props;

    const saveSchedule = () => {
        const s3Client = new S3Client();
        const originalSongsCopy = _.cloneDeep(originalSongs);
        s3Client.put(
            s3Client.createPutPublicJsonRequest(
                'bitter-jester-test',
                'original-song-submissions.json',
                JSON.stringify(originalSongsCopy)
            )
        );
        onAlert();
    };

    return (
        <Fragment>
            <div className={'saveScheduleButtonContainer'}>
                <Button className={'saveScheduleButton'} onClick={saveSchedule}>Update Competition Schedule</Button>
            </div>
        </Fragment>
    );
};

export default SaveOriginalSongScheduleButton;