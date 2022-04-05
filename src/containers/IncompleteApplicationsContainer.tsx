import React, {Fragment, useEffect, useState} from 'react';
import {Title} from '../Components/Title';
import {CardBody, Col, Row} from 'reactstrap';
import TotalCount from '../Components/TotalCount';
import SortIncompleteApplicationsDropdown from '../Components/SortIncompleteApplicationsDropdown';
import _ from 'lodash';
import {BitterJesterApiApplicationsRequest} from "../utils/api-requests/bitter-jester-api-applications-request";
import {useSelector} from "react-redux";
import {DataManagerReduxStore} from "../redux/data-manager-redux-store";
import {Columns, DataGrid} from "@material-ui/data-grid";
import CardContainer from "../Components/Cards/CardContainer";
import Page from "../Components/Page";

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

        if (selectedCompetition.id && selectedCompetition.id !== '') {
            fetch();
        }
    }, [selectedCompetition.id]);

    const sortByBandName = () => {
        const incompleteApplicationsCopy = _.cloneDeep(incompleteApplications.incompleteApplications);

        return incompleteApplicationsCopy.sort((a, b) => a.bandName.toLowerCase() < b.bandName.toLowerCase() ? -1 : 1);
    };

    const orderedApplications = isSortedByBandName ? sortByBandName() : incompleteApplications.incompleteApplications;
    const COLUMNS: Columns = [
        {
            field: 'id',
            headerName: 'Id',
            width: 80,
        },
        {
            field: 'bandName',
            headerName: 'Band Name',
            width: 160,
        },
        {
            field: 'primaryContactName',
            headerName: 'Primary Contact Name',
            width: 200,
        },
        {
            field: 'primaryEmailAddress',
            headerName: 'Primary Email Address',
            width: 160,
        },
        {
            field: 'relationshipToBand',
            headerName: 'Relationship to Band',
            width: 200,
        }
    ]
    const rows = orderedApplications
        .map((app, index) => ({
            id: index + 1,
            bandName: app.bandName,
            primaryContactName: `${app.applicantName.first} ${app.applicantName.last}`,
            primaryEmailAddress: app.primaryEmailAddress,
            relationshipToBand: app.relationshipToBand,
        }));
    return (
        <Page>
            <CardContainer>
                <Title titleDisplayText='Incomplete Applications'/>
                <TotalCount
                    count={incompleteApplications.incompleteApplications ? incompleteApplications.incompleteApplications.length : 0}/>
                <div style={{height: '80vh', width: '100%'}}>
                    <DataGrid
                        columns={COLUMNS}
                        rows={rows}
                    />
                </div>
            </CardContainer>
        </Page>
    );
};