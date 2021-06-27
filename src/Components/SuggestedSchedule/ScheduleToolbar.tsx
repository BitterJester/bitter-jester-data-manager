import React, { useState, Fragment } from 'react';
import { Row, Alert } from 'reactstrap';
import ScheduleDropdown from './ScheduleDropdown';
import { Schedule, SUGGESTED_FRIDAY_NIGHT_SCHEDULE } from '../../containers/ScheduleContainer';
import SaveScheduleButton from './SaveScheduleButton';
import TotalCount from '../TotalCount';
import CompetitionBandsMultiSelectCheckboxDropdown from "./CompetitionBandsMultiSelectCheckboxDropdown";
import {DataManagerReduxStore} from "../../redux/data-manager-redux-store";
import {useSelector} from "react-redux";

const USER_FRIDAY_NIGHT_SCHEDULE = 'user-friday-night-schedule.json';

type Props = {
    schedule: Schedule;
    updateSchedule: Function;
}

const ScheduleToolbar = (props: Props) => {
    const { schedule, updateSchedule } = props;
    const removedBands = useSelector((state: DataManagerReduxStore) => state.selectedCompetition.removedBands);
    const [isSaveAlertOpen, setIsSaveAlertOpen] = useState(false);

    const onAlert = () => {
        setIsSaveAlertOpen(!isSaveAlertOpen);
    }

    const getTotalBands = (): number => {
        return schedule.nights.reduce((count, night) => count + night.bands.length, 0) - removedBands.length;
    }
    
    return (
        <Fragment>
            <Alert isOpen={isSaveAlertOpen} toggle={onAlert} style={{ textAlign: 'center' }}>The schedule has been updated!</Alert>
            <div style={{display: 'flex', width: '100%', alignItems: 'flex-start'}}>
                <ScheduleDropdown
                    dropdownItemOnClick={() => updateSchedule(SUGGESTED_FRIDAY_NIGHT_SCHEDULE)}
                    dropdownItemOnClick2={() => updateSchedule(USER_FRIDAY_NIGHT_SCHEDULE)}
                />
                <SaveScheduleButton schedule={schedule} onAlert={onAlert} />
                <div style={{ textAlign: 'right', width: '80%', paddingRight: '32px', display: 'inline' }}>
                    <CompetitionBandsMultiSelectCheckboxDropdown />
                    <TotalCount count={getTotalBands()}/>
                </div>
            </div>
        </Fragment>
    );
};

export default ScheduleToolbar;