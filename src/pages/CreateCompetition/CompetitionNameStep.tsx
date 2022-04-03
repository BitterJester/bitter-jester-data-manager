import React from 'react';
import {TextField} from "@material-ui/core";

const CompetitionNameStep = (props) => {
    const {updateCompetition} = props;
    return (
        <div className={'step-container'}>
            <TextField
                id={'competition-name'}
                label={'Competition Name'}
                onChange={(event) => {
                    const name = event.target.value;
                    updateCompetition({name: {selectedValue: name}});
                }}
            />
        </div>
    );
};

export default CompetitionNameStep;