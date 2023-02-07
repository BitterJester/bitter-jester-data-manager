import * as React from 'react';
import {useSelector} from "react-redux";
import dataManagerReduxStore, {DataManagerReduxStore} from "../../redux/data-manager-redux-store";
import {DataGrid} from "@material-ui/data-grid";

const COLUMNS = [
    { field: 'bandName', headerName: 'Band Name', width: 200 },
    { field: 'type', headerName: 'Type', width: 120},
    { field: 'fileName', headerName: 'File Name', width: 548, filterable: false},
    { field: 'fileType', headerName: 'File Type', width: 120 },
];

const TYPE_MAP = {
    band_photo: 'Band Photo',
    stage_plot: 'Stage Plot',
    music: 'Music',
    logo: 'Logo',
}

const UploadedFilesTable = () => {
    const uploadedFiles = useSelector((state: DataManagerReduxStore) => state.uploadedFiles.files);
    const rows = uploadedFiles.map((file, index) => ({...file, id: index, type: TYPE_MAP[file.type]}));

    const onSelectionChange = (update) => {
        const selectedFiles = rows.filter(row => update.rowIds.includes(row.id.toString()));
        dataManagerReduxStore.dispatch({
            type: 'files/set',
            payload: {selectedFiles}
        });
    };

    return (
        <div style={{height: '80vh', width: '100%'}}>
            <DataGrid onSelectionChange={onSelectionChange} columns={COLUMNS} rows={rows} pageSize={50} checkboxSelection
            />
        </div>
    );
}

export default UploadedFilesTable;