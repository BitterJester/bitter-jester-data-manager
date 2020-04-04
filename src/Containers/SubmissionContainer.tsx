import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { BitterJesterApplications, BitterJesterApplication } from '../Pages/Submissions/Submissions';
import { Title } from '../Components/Title';
import { getFromS3 } from '../aws/getFromS3';
import CardContainer from '../Components/CardContainer';
import NByMGrid from '../Components/NByMGrid/NByMGrid';
import '../static/submissionContainer.css';
import CompletedSubmissionCard from '../Components/Cards/CompletedSubmissionCard';
import { UpdateInfoButton } from '../Components/UpdateInfoButton';
import TotalCount from '../Components/TotalCount';

export type PrunedApplication = {
    bandName: string;
    primaryEmailAddress: string;
    firstChoiceFridayNight: string;
    secondChoiceFridayNight: string;
    primaryPhoneNumber: string;
    citiesRepresented: string;
}

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

    const pruneDownApplicationsForDisplay = (applications: BitterJesterApplication[]): PrunedApplication[] => {
        return applications.map((app, index) => {
            return {
                bandName: app.bandName,
                primaryEmailAddress: app.primaryEmailAddress,
                firstChoiceFridayNight: app.firstChoiceFridayNight || '',
                secondChoiceFridayNight: app.secondChoiceFridayNight || '',
                primaryPhoneNumber: app.primaryPhoneNumber,
                citiesRepresented: app.citiesRepresented
            };
        });
    }

    const prunedApplications = pruneDownApplicationsForDisplay(completedApplications);

    const completedSubmissionCards = prunedApplications.map((prunedApplication, index) => {
        return <CompletedSubmissionCard key={index} completedSubmission={prunedApplication} />
    });

    const getTotalCount = () => {
        return submissions.completedApplications ? submissions.completedApplications.length : 0;
    }

    return (
        <Container fluid>
            <div style={{ padding: '16px' }}>
                <CardContainer>
                    <UpdateInfoButton />
                    <TotalCount count={getTotalCount()}/>
                    <Title titleDisplayText={'Completed Submissions'} />
                    <NByMGrid columns={2} gridItems={completedSubmissionCards} />
                </CardContainer>
            </div>
        </Container>
    );
}