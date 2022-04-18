import React, { useState, Fragment } from 'react';
import { Alert } from 'reactstrap';
import ScheduleDropdown from './ScheduleDropdown';
import {LAST_SAVE_VERSION, Schedule, SUGGESTED_VERSION} from '../../containers/ScheduleContainer';
import SaveScheduleButton from './SaveScheduleButton';
import TotalCount from '../TotalCount';
import CompetitionBandsMultiSelectCheckboxDropdown from "./CompetitionBandsMultiSelectCheckboxDropdown";

type Props = {
    schedule: Schedule;
    updateSchedule: Function;
}

const ScheduleToolbar = (props: Props) => {
    const { schedule, updateSchedule } = props;
    const [isSaveAlertOpen, setIsSaveAlertOpen] = useState(false);

    const onAlert = () => {
        setIsSaveAlertOpen(false);
        setIsSaveAlertOpen(true);
    }

    const getTotalBands = (): number => {
        return schedule.nights.reduce((count, night) => count + night.bands.length, 0);
    }
    
    return (
        <Fragment>
            <Alert isOpen={isSaveAlertOpen} toggle={onAlert} style={{ textAlign: 'center' }}>The schedule has been updated!</Alert>
            <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap'}}>
                <div style={{display: 'flex', width: '50%'}}>
                    <ScheduleDropdown
                        dropdownItemOnClick={() => updateSchedule(SUGGESTED_VERSION)}
                        dropdownItemOnClick2={() => updateSchedule(LAST_SAVE_VERSION)}
                    />
                    <SaveScheduleButton schedule={schedule} onAlert={onAlert} />
                </div>
                <div style={{ width: '50%', textAlign: 'right', paddingRight: '32px'}}>
                    <CompetitionBandsMultiSelectCheckboxDropdown />
                    <TotalCount count={getTotalBands()}/>
                </div>
            </div>
        </Fragment>
    );
};

export default ScheduleToolbar;