import React, {useEffect, useState} from 'react';
import {Container} from 'reactstrap';
import {BitterJesterApplications} from '../Pages/Submissions/Submissions';
import {Title} from '../Components/Title';
import {getFromS3} from '../aws/getFromS3';
import CardContainer from '../Components/Cards/CardContainer';
import '../static/css/submissionContainer.css';
import {UpdateInfoButton} from '../Components/CompletedSubmissions/UpdateInfoButton';
import TotalCount from '../Components/TotalCount';
import CompletedSubmissionCardsTable from '../Components/CompletedSubmissions/CompletedSubmissionCardsTable';

export const SubmissionContainer = () => {
    const initialSubmissions: BitterJesterApplications = {};
    const [submissions, setSubmissions] = useState(initialSubmissions);

    useEffect(() => {
        async function fetch() {
            await getFromS3('bitter-jester-test.json', setSubmissions);
        }
        fetch();
    }, []);

    const completedApplications = submissions.completedApplications || [];

    const getTotalCount = () => {
        return submissions.completedApplications ? submissions.completedApplications.length : 0;
    }

    return (
        <Container fluid>
            <div style={{ padding: '16px' }}>
                <CardContainer>
                    <Title titleDisplayText={'Completed Submissions'} />
                    <UpdateInfoButton />
                    <TotalCount count={getTotalCount()}/>
                    <CompletedSubmissionCardsTable completedSubmissions={completedApplications}/>
                </CardContainer>
            </div>
        </Container>
    );
}