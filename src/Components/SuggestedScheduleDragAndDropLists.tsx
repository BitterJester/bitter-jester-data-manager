import React, { Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import { DragAndDropList } from './DragAndDrop/DragAndDropList';
import { Schedule } from '../Containers/ScheduleContainer';
import { BackgroundColor } from './BackgroundColor';

type Props = {
    schedule: Schedule;
    updateSchedule: Function;
}

export const SuggestedScheduleDragAndDropLists = (props: Props) => {
    const { schedule } = props;
    const fridayNights = ['6/5', '6/12', '6/19', '6/26'];
    const schedulesInformationForEachNight = [];

    schedule.nights.forEach(night => {
        const submissionTableRowBandsForOneNight = night.bands.map((app, index) => {
            const color = new BackgroundColor(app, night.night).get();

            return <Col style={{ color: color }}>{app.bandName}</Col>
        });

        schedulesInformationForEachNight.push(submissionTableRowBandsForOneNight);
    });

    return (
        <Fragment>
            <Row>
                <DragAndDropList
                    initialOrderComponentsToDisplay={schedulesInformationForEachNight}
                    updateState={props.updateSchedule}
                    orderedColumnTitles={fridayNights}
                />
            </Row>
        </Fragment>
    );
}