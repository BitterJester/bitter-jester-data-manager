import React, {useEffect} from 'react';
import {Container} from 'reactstrap';
import {Title} from '../Components/Title';
import CardContainer from '../Components/Cards/CardContainer';
import '../static/css/submissionContainer.css';
import {UpdateInfoButton} from '../Components/CompletedSubmissions/UpdateInfoButton';
import TotalCount from '../Components/TotalCount';
import CompletedSubmissionCardsTable from '../Components/CompletedSubmissions/CompletedSubmissionCardsTable';
import {useSelector} from "react-redux";
import dataManagerReduxStore, {DataManagerReduxStore} from "../redux/data-manager-redux-store";
import {BitterJesterApiApplicationsRequest} from "../utils/api-requests/bitter-jester-api-applications-request";

export const SubmissionContainer = () => {
    const submissions = useSelector((state: DataManagerReduxStore) => state.selectedCompetition.bands);

    useEffect(() => {
        async function fetch() {
            const applicationsApiRequest = new BitterJesterApiApplicationsRequest();
            const completedSubmissions = await applicationsApiRequest.getCompletedApplications();

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