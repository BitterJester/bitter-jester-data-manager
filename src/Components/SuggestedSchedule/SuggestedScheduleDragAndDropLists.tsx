import React, {Fragment} from 'react';
import {Col, Row} from 'reactstrap';
import {DragAndDropList} from '../DragAndDrop/DragAndDropList';
import {Schedule} from '../../containers/ScheduleContainer';
import {BackgroundColor} from './BackgroundColor';
import '../../static/css/suggestedScheduleDragAndDropLists.css';
import {useSelector} from "react-redux";
import {DataManagerReduxStore} from "../../redux/data-manager-redux-store";
import GradeIcon from '@material-ui/icons/Grade';

type Props = {
    schedule: Schedule;
    updateSchedule: Function;
}

export const SuggestedScheduleDragAndDropLists = (props: Props) => {
    const {schedule} = props;
    const fridayNights = ['7/23', '7/30', '8/6', '8/13'];
    const schedulesInformationForEachNight = [];
    const removedBands = useSelector((state: DataManagerReduxStore) => state.selectedCompetition.removedBands);

    schedule.nights.forEach(night => {
        const submissionTableRowBandsForOneNight = night.bands
            .filter(band => !removedBands.includes(band.bandName))
            .map((app, index) => {
            const color = new BackgroundColor(app, night.night).get();
            const isShowcaseBand = index === 0;
            return (
                <Col>
                    {isShowcaseBand && <div style={{color: 'purple'}} className={'suggestedScheduleItemInfo'}>
                        <GradeIcon />
                    </div>}
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
    })

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