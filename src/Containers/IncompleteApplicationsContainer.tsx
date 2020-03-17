import React, { useState, useEffect } from 'react';
import { getFromS3 } from '../aws/getFromS3';
import { Row, Col } from 'reactstrap';

type IncompleteApplications = {
    incompleteApplications: IncompleteApplication[];
}

type IncompleteApplication = {
    applicantName?: {
        first: string;
        last: string;
    };
    bandName?: string;
    primaryEmailAddress?: string;
    relationshipToBand?: string;
};

export const IncompleteApplicationsContainer = () => {
    const initialIncompleteApplications: IncompleteApplications = {
        incompleteApplications: []
    };
    const [incompleteApplications, setIncompleteApplications] = useState(initialIncompleteApplications);

    useEffect(() => {
        async function fetch() {
            await getFromS3('incomplete-applications.json', setIncompleteApplications);
        }
        fetch();
    }, []);

    return (
        <div>
            <Row>
                <Col>
                    <strong>Applicant Name</strong>
                </Col>
                <Col>
                    <strong>Band Name</strong>
                </Col>
                <Col>
                    <strong>Primary Email Address</strong>
                </Col>
                <Col>
                    <strong>Relationship to Band</strong>
                </Col>
            </Row>
            {
                incompleteApplications.incompleteApplications
                    .map(app => {
                        return (
                            <Row>
                                <Col>
                                    {`${app.applicantName.first} ${app.applicantName.last}`}
                                </Col>

                                <Col>
                                    {app.bandName}
                                </Col>

                                <Col>
                                    {app.primaryEmailAddress}
                                </Col>

                                <Col>
                                    {app.relationshipToBand}
                                </Col>
                            </Row>
                        );
                    })
            }
        </div>
    );
};