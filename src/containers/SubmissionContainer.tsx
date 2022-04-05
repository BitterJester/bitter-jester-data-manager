import React, {useEffect} from 'react';
import {Container} from 'reactstrap';
import {Title} from '../Components/Title';
import CardContainer from '../Components/Cards/CardContainer';
import '../static/css/submissionContainer.css';
import TotalCount from '../Components/TotalCount';
import CompletedSubmissionCardsTable from '../Components/CompletedSubmissions/CompletedSubmissionCardsTable';
import {useSelector} from "react-redux";
import dataManagerReduxStore, {DataManagerReduxStore} from "../redux/data-manager-redux-store";
import {BitterJesterApiApplicationsRequest} from "../utils/api-requests/bitter-jester-api-applications-request";

export const SubmissionContainer = () => {
    const submissions = useSelector((state: DataManagerReduxStore) => state.selectedCompetition.bands);
    const {selectedCompetition, competitions} = useSelector((state: DataManagerReduxStore) => {
        return ({competitions: state.appInfo.competitions, selectedCompetition: state.selectedCompetition});
    });
    useEffect(() => {
        async function fetch() {
            const applicationsApiRequest = new BitterJesterApiApplicationsRequest();
            const completedSubmissions = await applicationsApiRequest.getCompletedApplications(selectedCompetition.id);
            dataManagerReduxStore.dispatch({
                type: 'competition/set-bands',
                payload: {bands: completedSubmissions ? completedSubmissions.completedApplications : []}
            })
        }

        if (selectedCompetition.id && selectedCompetition.id !== '') {
            fetch();
        }
    }, [selectedCompetition.id]);

    const getTotalCount = () => {
        return submissions ? submissions.length : 0;
    }

    return (
        <Container fluid>
            <div style={{padding: '16px'}}>
                <CardContainer>
                    <Title titleDisplayText={'Completed Submissions'}/>
                    <TotalCount count={getTotalCount()}/>
                    <CompletedSubmissionCardsTable completedSubmissions={submissions}/>
                </CardContainer>
            </div>
        </Container>
    );
}