import React, {Fragment} from 'react';
import {Col, Row} from 'reactstrap';
import {DragAndDropList} from '../DragAndDrop/DragAndDropList';
import {Schedule} from '../../containers/ScheduleContainer';
import {BackgroundColor} from './BackgroundColor';
import '../../static/css/suggestedScheduleDragAndDropLists.css';
import {useSelector} from "react-redux";
import {DataManagerReduxStore} from "../../redux/data-manager-redux-store";
import GradeIcon from '@material-ui/icons/Grade';
import {DropResult} from "react-beautiful-dnd";
import {getNightMap} from "../../utils/getNightMap";
import BitterJesterApiRequest from "../../utils/api-requests/bitter-jester-api-request";

type Props = {
    schedule: Schedule;
    updateSchedule: Function;
}

export const SuggestedScheduleDragAndDropLists = (props: Props) => {
    const {schedule} = props;
    const schedulesInformationForEachNight = [];
    const selectedCompetition = useSelector((state: DataManagerReduxStore) => state.selectedCompetition);
    const removedBands = selectedCompetition.removedBands;
    const fridayNights = Object.values(getNightMap(selectedCompetition.id)).map(night => `${night.month}/${night.dayOfTheMonth}`);

    function getValueOrDefault(value, modifierFunction = (value) => value) {
        return value ? modifierFunction(value) : '-';
    }

    if(schedule && schedule.nights) {
        schedule.nights.forEach(night => {
            const submissionTableRowBandsForOneNight = night.bands
                .filter(band => band && !removedBands.includes(band.bandName))
                .map((app, index) => {
                    const color = new BackgroundColor(app, night.night).get(selectedCompetition.id);
                    const isFirstShowcaseBand = index === 0;
                    const isSecondShowcaseBand = index === night.bands.length - 2;
                    const isGuestArtist = index === night.bands.length - 1;
                    return (
                        <Col>
                            {isFirstShowcaseBand && <div style={{color: 'rgb(227, 194, 27)'}} className={'suggestedScheduleItemInfo'}>
                                <GradeIcon/>
                            </div>}
                            {isSecondShowcaseBand && <div style={{color: 'blue'}} className={'suggestedScheduleItemInfo'}>
                                <GradeIcon/>
                            </div>}
                            {isGuestArtist && <div style={{color: 'purple'}} className={'suggestedScheduleItemInfo'}>
                                <GradeIcon/>
                            </div>}
                            <div style={{backgroundColor: color}} className={'suggestedScheduleBandName'}>
                                {app.bandName}
                            </div>
                            <div className={'suggestedScheduleItemInfo'}>
                                {`First Choice: ${app.firstChoiceFridayNight}`}
                            </div>
                            <div className={'suggestedScheduleItemInfo'}>
                                {`Second Choice: ${getValueOrDefault(app.secondChoiceFridayNight)}`}
                            </div>
                            <div className={'suggestedScheduleItemInfo'}>
                                {`Unavailable Nights: ${(getValueOrDefault(app.unavailableFridayNights, (value) => value.join(', ')))}`}
                            </div>
                            <div className={'suggestedScheduleItemInfo'}>
                                {`Cities Represented: ${app.citiesRepresented}`}
                            </div>
                            <div className={'suggestedScheduleItemInfo'}>
                                {`Band Member Ages: ${app.bandMemberAges ? app.bandMemberAges.join(', ') : '-'}`}
                            </div>
                            <div className={'suggestedScheduleItemInfo'}>
                                {`Average Age: ${app.bandMemberAges ? (app.bandMemberAges.reduce((acc, curr) => acc + Number(curr), 0)) / app.bandMemberAges.length : '-'}`}
                            </div>
                        </Col>
                    );
                });

            schedulesInformationForEachNight.push(submissionTableRowBandsForOneNight);
        });
    }

    const getDroppableIndex = (droppableId) => droppableId.split('-')[1];

    // const onDragEnd = async (result: DropResult, provided) => {
    //     const destinationIsShowcaseBand = result.destination.index === 0;
    //     const sourceIsShowcaseBand = result.source.index === 0;
    //     if (destinationIsShowcaseBand) {
    //         const night = getDroppableIndex(result.destination.droppableId);
    //     } else if (sourceIsShowcaseBand) {
    //         const night = getDroppableIndex(result.source.droppableId);
    //         showcaseBand = schedule.nights[night].bands[1];
    //     }
    //
    // };
    return (
        <Fragment>
            <Row>
                <DragAndDropList
                    typeOfItemsInLists={'Bands'}
                    initialOrderComponentsToDisplay={schedulesInformationForEachNight}
                    updateState={props.updateSchedule}
                    orderedColumnTitles={fridayNights}
                    // onDragEnd={onDragEnd}
                />
            </Row>
        </Fragment>
    );
}