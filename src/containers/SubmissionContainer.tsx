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
import BitterJesterApiRequest, {API_URL_PATHS} from "../utils/bitter-jester-api-request";
import {BitterJesterApplications} from "../pages/Submissions";

export const SubmissionContainer = () => {
    const submissions = useSelector((state: DataManagerReduxStore) => state.selectedCompetition.bands);

    useEffect(() => {
        async function fetch() {
            const completedSubmissions = await BitterJesterApiRequest.get<BitterJesterApplications>(API_URL_PATHS.COMPLETED_SUBMISSIONS);

            dataManagerReduxStore.dispatch({
                type: 'competition/set-bands',
                payload: {bands: completedSubmissions.completedApplications}
            })
        }

        fetch();
    }, []);

    const getTotalCount = () => {
        return submissions ? submissions.length : 0;
    }

    return (
        <Container fluid>
            <div style={{padding: '16px'}}>
                <CardContainer>
                    <Title titleDisplayText={'Completed Submissions'}/>
                    <UpdateInfoButton/>
                    <TotalCount count={getTotalCount()}/>
                    <CompletedSubmissionCardsTable completedSubmissions={submissions}/>
                </CardContainer>
            </div>
        </Container>
    );
}