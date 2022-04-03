import React, {useEffect, useState} from 'react';
import {Title} from '../Components/Title';
import {CardBody, Col, Row} from 'reactstrap';
import TotalCount from '../Components/TotalCount';
import SortIncompleteApplicationsDropdown from '../Components/SortIncompleteApplicationsDropdown';
import _ from 'lodash';
import {BitterJesterApiApplicationsRequest} from "../utils/api-requests/bitter-jester-api-applications-request";
import {useSelector} from "react-redux";
import {DataManagerReduxStore} from "../redux/data-manager-redux-store";

type IncompleteApplications = {
    incompleteApplications: IncompleteApplication[];
}

export type IncompleteApplication = {
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
    const [isSortedByBandName, setIsSortedByBandName] = useState(false);
    const {selectedCompetition, competitions} = useSelector((state: DataManagerReduxStore) => {
        return ({competitions: state.appInfo.competitions, selectedCompetition: state.selectedCompetition});
    });
    useEffect(() => {
        async function fetch() {
            const applicationsApiRequest = new BitterJesterApiApplicationsRequest();
            const updatedApps = await applicationsApiRequest.getIncompleteApplications(selectedCompetition.id);
            setIncompleteApplications(updatedApps);
        }
        fetch();
    }, []);

    const sortByBandName = () => {
        const incompleteApplicationsCopy = _.cloneDeep(incompleteApplications.incompleteApplications);

        return incompleteApplicationsCopy.sort((a, b) => a.bandName.toLowerCase() < b.bandName.toLowerCase() ? -1 : 1);
    };

    const orderedApplications = isSortedByBandName ? sortByBandName() : incompleteApplications.incompleteApplications;

    const incompleteSubmissionCards = orderedApplications
        .map(app => {
            return (
                <Row>
                    <Col>{app.bandName}</Col>
                    <Col>{`${app.applicantName.first} ${app.applicantName.last}`}</Col>
                    <Col>{app.primaryEmailAddress}</Col>
                    <Col>{app.relationshipToBand}</Col>
                </Row>
            );
        });

    return (
        <div>
            <Title titleDisplayText='Incomplete Applications' />
            <TotalCount count={incompleteApplications.incompleteApplications ? incompleteApplications.incompleteApplications.length : 0} />
            {incompleteApplications.incompleteApplications.length ?
                <CardBody>
                <Row>
                    <SortIncompleteApplicationsDropdown
                        dropdownItemOnClick={() => setIsSortedByBandName(false)}
                        dropdownItemOnClick2={() => setIsSortedByBandName(true)}
                    />
                </Row>
                <Row>
                    <Col style={{fontSize: '24px', fontWeight: 'bold'}}>Band Name</Col>
                    <Col style={{fontSize: '24px', fontWeight: 'bold'}}>Applicant Name</Col>
                    <Col style={{fontSize: '24px', fontWeight: 'bold'}}>Primary Email Address</Col>
                    <Col style={{fontSize: '24px', fontWeight: 'bold'}}>Relationship To Band</Col>
                </Row>
                {incompleteSubmissionCards}
            </CardBody> :
                <div>
                    <h1>No Incomplete Applications.</h1>
                </div>
            }
        </div>
    );
};