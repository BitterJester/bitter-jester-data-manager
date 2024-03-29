import React, {useEffect, useState} from 'react';
import {DataGrid, ColDef, SelectionChangeParams} from '@material-ui/data-grid';
import {getFromS3} from "../../aws/getFromS3";
import {BitterJesterApiCompetitionsRequest} from "../../utils/api-requests/bitter-jester-api-competitions-request";

const JudgeSelectionTableStep = (props) => {
    const {selectedCompetitionJudges, updateCompetition} = props;
    const [judges, updateJudges] = useState([]);
    const fetch = async () => {
        const response = await new BitterJesterApiCompetitionsRequest().getAllJudges();
        const judgesWithArbitraryId = response.judges.map((judge, index) => ({id: index, ...judge}));
        updateJudges(judgesWithArbitraryId);
    }

    useEffect(() => {
        fetch();
    }, []);

    const columns: ColDef[] = [
        {field: 'id', headerName: 'Id', width: 60},
        {field: 'firstName', headerName: 'First Name', width: 130},
        {field: 'lastName', headerName: 'Last Name', width: 130},
        {
            field: 'emailAddress',
            headerName: 'Email',
            width: 300,
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            width: 160,
        },
    ];

    const onSelectionChange = (update: SelectionChangeParams) => {
        const selectedJudges = judges.filter(judge => update.rowIds.includes(judge.id.toString()));
        updateCompetition({
            judges: {
                judges: selectedJudges,
                selectedValue: `${selectedJudges.length} judges selected`
            }
        });
    };

    return (
        <div style={{height: 400, width: '100%'}}>
            {judges.length > 0 &&
            <DataGrid onSelectionChange={onSelectionChange} rows={judges} columns={columns} pageSize={5}
                      checkboxSelection/>}
        </div>
    );
}

export default JudgeSelectionTableStep;