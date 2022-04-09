import React, {Fragment} from 'react';
import {Button} from 'reactstrap';
import {S3Client} from '../../aws/s3Client';
import {LAST_SAVE_VERSION, Schedule} from '../../containers/ScheduleContainer';
import '../../static/css/saveScheduleButton.css';
import _ from 'lodash';
import axios from "axios";
import {UrlHelper} from "../../utils/url-helper";
import {BitterJesterApiScheduleRequest} from "../../utils/api-requests/bitter-jester-api-schedule-request";
import {useSelector} from "react-redux";
import {DataManagerReduxStore} from "../../redux/data-manager-redux-store";

type Props = {
    schedule: Schedule,
    onAlert: Function
}

const SaveScheduleButton = (props: Props) => {
    const {schedule, onAlert} = props;
    const {selectedCompetition, competitions} = useSelector((state: DataManagerReduxStore) => {
        return ({competitions: state.appInfo.competitions, selectedCompetition: state.selectedCompetition});
    });
    const saveSchedule = async () => {
        // weird if i remove this i get an error related to circular dependencies
        new S3Client();
        const scheduleCopy = _.cloneDeep(schedule);
        scheduleCopy.version = LAST_SAVE_VERSION;
        await new BitterJesterApiScheduleRequest().saveSchedule(selectedCompetition.id, scheduleCopy);
        onAlert();
    };

    return (
        <Fragment>
            <div className={'saveScheduleButtonContainer'}>
                <Button className={'saveScheduleButton'} onClick={saveSchedule}>Save Schedule</Button>
            </div>
        </Fragment>
    );
}

export default SaveScheduleButton;