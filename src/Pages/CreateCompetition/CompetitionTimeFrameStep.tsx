import React, {useEffect, useState} from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const CompetitionTimeFrameStep = (props) => {
    const {selectedCompetitionTimeFrame} = props;

    const selectedStartDate = selectedCompetitionTimeFrame && selectedCompetitionTimeFrame.start ? selectedCompetitionTimeFrame.start : new Date();
    const selectedEndDate = selectedCompetitionTimeFrame && selectedCompetitionTimeFrame.end ? selectedCompetitionTimeFrame.end : new Date();

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        label="Start Date"
                        value={selectedStartDate}
                        onChange={(value) => props.updateCompetition({
                            timeFrame: {
                                start: value,
                                end: selectedEndDate,
                                selectedValue: `${value.toDateString()} - ${selectedEndDate.toDateString()}`
                            }
                        })}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        label="End Date"
                        value={selectedEndDate}
                        onChange={(value) => props.updateCompetition({
                            timeFrame: {
                                start: selectedStartDate,
                                end: value,
                                selectedValue: `${selectedStartDate.toDateString()} to ${value.toDateString()}`
                            }
                        })}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </div>
            </MuiPickersUtilsProvider>
        </div>
    )
};

export default CompetitionTimeFrameStep;