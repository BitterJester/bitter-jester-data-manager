import React, {useEffect, useState} from 'react';
import {DataGrid} from '@material-ui/data-grid';
import {getFromS3} from "../../aws/getFromS3";

const BandSelectionTableStep = (props) => {
    const {selectedCompetitionBands, updateCompetition} = props;
    const [bands, updateBands] = useState([]);
    const fetch = async () => {
        await getFromS3('all-applications.json', (response) => {
            const bandsWithArbitraryId = response.completedApplications.map((app, index) => ({...app, id: index}));
            updateBands(bandsWithArbitraryId);
        }, true);
    }

    useEffect(() => {
        fetch();
    }, []);

    const columns = [
        {field: 'id', headerName: 'Id', width: 60},
        {field: 'bandName', headerName: 'Band Name', width: 160},
        {field: 'primaryEmailAddress', headerName: 'Primary Email Address', width: 300},
        {
            field: 'citiesRepresented',
            headerName: 'Cities Represented',
            width: 200,
        },
        {
            field: 'primaryPhoneNumber',
            headerName: 'Primary Phone Number',
            width: 160,
        },
    ];

    const onSelectionChange = (update) => {
        const selectedBands = bands.filter(band => update.rowIds.includes(band.id.toString()));
        updateCompetition({
            bands: {
                bands: selectedBands,
                selectedValue: `${selectedBands.length} bands selected`
            }
        });
    };

    return (
        <div style={{height: 400, width: '100%'}}>
            {bands.length > 0 &&
            <DataGrid onSelectionChange={onSelectionChange} rows={bands} columns={columns} pageSize={5}
                      checkboxSelection/>}
        </div>
    );
}

export default BandSelectionTableStep;