import React, {Fragment} from 'react';
import {BitterJesterApplication} from '../../pages/Submissions';
import {ColDef, DataGrid} from "@material-ui/data-grid";

type Props = {
    completedSubmissions: BitterJesterApplication[];
}

const CompletedSubmissionCardsTable = (props: Props) => {
    const rows = props.completedSubmissions
        .map((file, index) => ({...file, id: index + 1}));
    const COLUMNS: ColDef[] = [
        {field: 'id', headerName: 'Id', width: 60},
        {field: 'bandName', headerName: 'Band Name', width: 130},
        {field: 'primaryEmailAddress', headerName: 'Primary Email Address', width: 160},
        {
            field: 'primaryPhoneNumber',
            headerName: 'Primary Phone Number',
            width: 160,
        },
        {
            field: 'citiesRepresented',
            headerName: 'Cities Represented',
            width: 300,
        },
        {
            field: 'referencedBands',
            headerName: 'Referenced Bands',
            width: 300,
        },
    ];
    return (
        <Fragment>
            <div style={{height: '80vh', width: '100%'}}>
                <DataGrid
                    columns={COLUMNS}
                    rows={rows}
                    pageSize={50}
                />
            </div>
        </Fragment>
    );
};

export default CompletedSubmissionCardsTable;