import React, { Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import { DragAndDropList } from '../DragAndDrop/DragAndDropList';
import { Schedule } from '../../Containers/ScheduleContainer';
import { BackgroundColor } from './BackgroundColor';
import '../../static/suggestedScheduleDragAndDropLists.css';

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

            return (
                <Col>
                    <div style={{ backgroundColor: color }} className={'suggestedScheduleBandName'}>
                        {app.bandName}
                    </div>
                    <div className={'suggestedScheduleItemInfo'}>
                        {`First Choice: ${app.firstChoiceFridayNight}`}
                    </div>
                    <div className={'suggestedScheduleItemInfo'}>
                        {`Second Choice: ${app.secondChoiceFridayNight}`}
                    </div>
                    <div className={'suggestedScheduleItemInfo'}>
                        {`Unavailable Nights: ${app.unavailableFridayNights}`}
                    </div>
                    <div className={'suggestedScheduleItemInfo'}>
                        {`Cities Represented: ${app.citiesRepresented}`}
                    </div>
                </Col>
            );
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