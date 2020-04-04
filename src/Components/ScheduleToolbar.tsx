import React, { useState, Fragment } from 'react';
import { Row, Alert } from 'reactstrap';
import ScheduleDropdown from './ScheduleDropdown';
import { Schedule, SUGGESTED_FRIDAY_NIGHT_SCHEDULE } from '../Containers/ScheduleContainer';
import SaveScheduleButton from './SaveScheduleButton';
import UpdateScheduleButton from '../UpdateScheduleButton';
import TotalCount from './TotalCount';

const USER_FRIDAY_NIGHT_SCHEDULE = 'user-friday-night-schedule.json';

type Props = {
    schedule: Schedule;
    updateSchedule: Function;
}

const ScheduleToolbar = (props: Props) => {
    const { schedule, updateSchedule } = props;

    const [isSaveAlertOpen, setIsSaveAlertOpen] = useState(false);


    const onAlert = () => {
        setIsSaveAlertOpen(!isSaveAlertOpen);
    }

    const getTotalBands = (): number => {
        return schedule.nights.reduce((count, night) => count + night.bands.length, 0);
    }

    return (
        <Fragment>
            <Alert isOpen={isSaveAlertOpen} toggle={onAlert} style={{ textAlign: 'center' }}>The schedule has been updated!</Alert>
            <Row>
                <ScheduleDropdown
                    dropdownItemOnClick={() => updateSchedule(SUGGESTED_FRIDAY_NIGHT_SCHEDULE)}
                    dropdownItemOnClick2={() => updateSchedule(USER_FRIDAY_NIGHT_SCHEDULE)}
                />
                <SaveScheduleButton schedule={schedule} onAlert={onAlert} />
                <UpdateScheduleButton onAlert={onAlert} />
                <TotalCount count={getTotalBands()}/>
            </Row>
        </Fragment>
    );
};

export default ScheduleToolbar;