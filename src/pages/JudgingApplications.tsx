import React, {useEffect, useState} from 'react';
import Page from "../Components/Page";
import {BitterJesterApiApplicationsRequest} from "../utils/api-requests/bitter-jester-api-applications-request";
import CardContainer from "../Components/Cards/CardContainer";
import {DragAndDropList} from "../Components/DragAndDrop/DragAndDropList";
import {getNightMap} from "../utils/getNightMap";
import {useSelector} from "react-redux";
import {DataManagerReduxStore} from "../redux/data-manager-redux-store";
import {Columns, DataGrid} from "@material-ui/data-grid";
import _ from 'lodash';
import {Row} from "reactstrap";

export const JudgingApplications = () => {
    const [judgingApplications, setJudgingApplications] = useState([]);
    const [judgingSchedule, setJudgingSchedule] = useState([[], [], [], []]);
    const selectedCompetition = useSelector((state: DataManagerReduxStore) => state.selectedCompetition);

    const fetch = async () => {
        const response = await new BitterJesterApiApplicationsRequest().getJudgingApplications('bitter_jester_summer_2022');
        setJudgingApplications(response.completedApplications);
        setJudgingSchedule([response.completedApplications, [], [], []]);
    }
    useEffect(() => {
        fetch();
    }, []);

    const fridayNights = Object.values(getNightMap(selectedCompetition.id)).map(night => `${night.month}/${night.dayOfTheMonth}`);

    const COLUMNS: Columns = [
        {
            field: 'id',
            headerName: 'Id',
            width: 80,
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 160,
        },
        {
            field: 'availableDays',
            headerName: 'Available Days',
            width: 300,
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            width: 240,
        }
    ]
    const rows = judgingApplications
        .map((app, index) => ({
            id: index + 1,
            name: `${app.firstName} ${app.lastName}`,
            availableDays: app.availableDays ? app.availableDays.join(', ') : '-',
            phoneNumber: app.phoneNumber ? app.phoneNumber : '-',
        }));

    const judgingApplicationCards = [];
    judgingSchedule.forEach(night => {
        const cardsForNight = night.map(app => {
            return (<div style={{color: 'black'}}>
                <div>
                    <p>Name: {app.firstName} {app.lastName}</p>
                </div>
                <div>
                    <p>Phone Number: {app.phoneNumber ? app.phoneNumber : '-'}</p>
                </div>
                <div>
                    <p>Available Days: {app.availableDays ? app.availableDays.join(', ') : '-'}</p>
                </div>
            </div>)
        });
        judgingApplicationCards.push(cardsForNight);
    });
    const updateJudgingSchedule = (sourceListIndex, sourceIndex, requestedIndexToDropIn, destinationIndex) => {
        const scheduleClone = _.cloneDeep(judgingSchedule);
        scheduleClone[requestedIndexToDropIn][destinationIndex] = scheduleClone[sourceListIndex][sourceIndex];
        scheduleClone[sourceListIndex] = scheduleClone[sourceListIndex].filter((something, index) => index !== sourceIndex);
        setJudgingSchedule(scheduleClone);
    }
    return (
        <Page>
            <CardContainer>
                <h2>Judging Schedule</h2>
                <p>
                    This page is a work in progress and although everyone can see it right now, it is just for Spencer for now
                    ;)
                </p>
                <Row>
                    <DragAndDropList
                        initialOrderComponentsToDisplay={judgingApplicationCards}
                        orderedColumnTitles={fridayNights}
                        updateState={updateJudgingSchedule}
                    />
                </Row>
            </CardContainer>
            <CardContainer>
                <h2>Judging Submissions</h2>
                <div style={{height: '80vh', width: '100%'}}>
                    <DataGrid columns={COLUMNS} rows={rows}/>
                </div>
            </CardContainer>
        </Page>
    )
}