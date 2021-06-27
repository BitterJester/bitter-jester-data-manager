import React, {useEffect, useState} from 'react';
import {Container} from 'reactstrap';
import {Title} from '../Components/Title';
import {getFromS3} from '../aws/getFromS3';
import CardContainer from '../Components/Cards/CardContainer';
import '../static/css/submissionContainer.css';
import {UpdateInfoButton} from '../Components/CompletedSubmissions/UpdateInfoButton';
import TotalCount from '../Components/TotalCount';
import CompletedSubmissionCardsTable from '../Components/CompletedSubmissions/CompletedSubmissionCardsTable';
import {useSelector} from "react-redux";
import dataManagerReduxStore, {DataManagerReduxStore} from "../redux/data-manager-redux-store";

export const SubmissionContainer = () => {
    const submissions = useSelector((state: DataManagerReduxStore) => state.selectedCompetition.bands);

    useEffect(() => {
        async function fetch() {
            await getFromS3('completed-submissions.json', (data) => {
                dataManagerReduxStore.dispatch({
                    type: 'competition/set-bands',
                    payload: {bands: data.completedApplications}
                })
            });
        }
        fetch();
    }, []);

    const getTotalCount = () => {
        return submissions ? submissions.length : 0;
    }

    return (
        <Container fluid>
            <div style={{ padding: '16px' }}>
                <CardContainer>
                    <Title titleDisplayText={'Completed Submissions'} />
                    <UpdateInfoButton />
                    <TotalCount count={getTotalCount()}/>
                    <CompletedSubmissionCardsTable completedSubmissions={submissions}/>
                </CardContainer>
            </div>
        </Container>
    );
}