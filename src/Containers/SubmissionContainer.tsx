import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { BitterJesterApplications, BitterJesterApplication } from '../Pages/Submissions/Submissions';
import { Title } from '../Components/Title';
import { getFromS3 } from '../aws/getFromS3';
import CardContainer from '../Components/CardContainer';
import NByMGrid from '../Components/NByMGrid/NByMGrid';
import '../static/submissionContainer.css';
import CompletedSubmissionCard from '../Components/Cards/CompletedSubmissionCard';

export type PrunedApplication = {
    bandName: string;
    primaryEmailAddress: string;
    firstChoiceFridayNight: string;
    secondChoiceFridayNight: string;
}

export type SubmissionsTableColumnNames = 'Band Name' | 'Primary Email Address' | 'First Choice Friday' | 'Second Choice Friday'

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
                secondChoiceFridayNight: app.secondChoiceFridayNight || ''
            };
        });
    }

    const prunedApplications = pruneDownApplicationsForDisplay(completedApplications);

    const completedSubmissionCards = prunedApplications.map((prunedApplication, index) => {
        return <CompletedSubmissionCard key={index} completedSubmission={prunedApplication} />
    });

    return (
        <Container fluid>
            <div style={{ padding: '16px' }}>
                <CardContainer>
                    <Title titleDisplayText={'Completed Submissions'} />
                    <NByMGrid columns={3} gridItems={completedSubmissionCards}/>
                </CardContainer>
            </div>
        </Container>
    );
}