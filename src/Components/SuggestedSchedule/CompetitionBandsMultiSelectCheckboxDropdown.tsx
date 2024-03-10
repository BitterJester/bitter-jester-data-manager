import React, {useEffect, useState} from 'react';
import {
    Checkbox,
    createStyles,
    FormControl,
    Input,
    InputLabel,
    ListItemText,
    makeStyles,
    MenuItem,
    Select,
    Theme
} from "@material-ui/core";
import dataManagerReduxStore, {DataManagerReduxStore} from "../../redux/data-manager-redux-store";
import {useSelector} from "react-redux";
import {Button} from "reactstrap";
import {S3Client} from "../../aws/s3Client";
import {Schedule} from "../../containers/ScheduleContainer";
import BitterJesterApiRequest, {API_URL_PATH_FUNCTIONS} from "../../utils/api-requests/bitter-jester-api-request";
import {BitterJesterApiScheduleRequest} from "../../utils/api-requests/bitter-jester-api-schedule-request";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const toLowerCaseAndTrimmed = (value) => {
    return value.trim().toLowerCase();
}

const mapToLowerCaseAndTrimmed = (values) => {
    return values.map(x => toLowerCaseAndTrimmed(x));
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 200,
            maxWidth: 400,
        },
    }),
);

const CompetitionBandsMultiSelectCheckboxDropdown = () => {
    const classes = useStyles();
    const scheduleApiRequest = new BitterJesterApiScheduleRequest();
    const {selectedCompetition, competitions} = useSelector((state: DataManagerReduxStore) => {
        return ({competitions: state.appInfo.competitions, selectedCompetition: state.selectedCompetition});
    });
    const {removedBands, allBandDropDownOptions} = useSelector((state: DataManagerReduxStore) => {
        return {
            allBandDropDownOptions: state.selectedCompetition.allBandDropDownOptions,
            removedBands: state.selectedCompetition.removedBands
        };
    });
    const [pendingForRemoval, setPendingForRemoval] = useState([]);
    const [pendingForAddition, setPendingForAddition] = useState([]);

    const fetch = async () => {
        const removedBands = await scheduleApiRequest.getRemovedBands(selectedCompetition.id);
        return dataManagerReduxStore.dispatch({
            type: 'competition/set-removed-bands',
            payload: {removedBands: removedBands && removedBands.removedBands ? removedBands.removedBands : []}
        });
    }

    useEffect(() => {
        if (selectedCompetition.id) {
            fetch();
        }
    }, [selectedCompetition.id])

    const onRemoveBand = async () => {
        const updatedRemovedBands = [...mapToLowerCaseAndTrimmed(removedBands), ...mapToLowerCaseAndTrimmed(pendingForRemoval)]
            .filter(pend => !mapToLowerCaseAndTrimmed(pendingForAddition).includes(toLowerCaseAndTrimmed(pend)));
        setPendingForRemoval([]);
        setPendingForAddition([]);
        dataManagerReduxStore.dispatch({
            type: 'competition/set-removed-bands',
            payload: {removedBands: updatedRemovedBands}
        });
        const response = await scheduleApiRequest.updateRemovedBands(updatedRemovedBands, selectedCompetition.id);
        const updatedSchedule = await scheduleApiRequest.getSchedule(selectedCompetition.id);
        dataManagerReduxStore.dispatch({
            type: 'competition/set-schedule',
            payload: {schedule: updatedSchedule}
        });
    };

    const isChecked = (option) => {
        return pendingForRemoval.filter(removedBandName => toLowerCaseAndTrimmed(removedBandName) === toLowerCaseAndTrimmed(option.id)).length === 1 ||
            removedBands.filter(removedBandName => toLowerCaseAndTrimmed(removedBandName) === toLowerCaseAndTrimmed(option.id) && !mapToLowerCaseAndTrimmed(pendingForAddition).includes(toLowerCaseAndTrimmed(removedBandName))).length === 1;
    }

    const addToPendingForAddition = (toAdd) => {
        setPendingForAddition([...mapToLowerCaseAndTrimmed(pendingForAddition), toLowerCaseAndTrimmed(toAdd)]);
    };

    const addToPendingForRemoval = (toAdd) => {
        setPendingForRemoval([...mapToLowerCaseAndTrimmed(pendingForRemoval), toLowerCaseAndTrimmed(toAdd)]);
    }

    const removeFromPendingForAddition = (toRemove) => {
        setPendingForAddition(pendingForAddition.filter(pend => toLowerCaseAndTrimmed(pend) !== toLowerCaseAndTrimmed(toRemove)));
    }

    const removeFromPendingForRemoval = (toRemove) => {
        setPendingForRemoval(pendingForRemoval.filter(pend => toLowerCaseAndTrimmed(pend) !== toLowerCaseAndTrimmed(toRemove)));
    }

    const insanity = (event) => {
        const updatedSelectedCombined = event.target.value as string[];
        const allRemoval = [...removedBands, ...pendingForRemoval].filter(pend => !pendingForAddition.includes(pend));
        const isAddBandBack = allRemoval.length > updatedSelectedCombined.length;
        const bandSelected = isAddBandBack ? allRemoval.filter(b => !updatedSelectedCombined.includes(b))[0] : updatedSelectedCombined.filter(b => !allRemoval.includes(b))[0];
        const wasActuallyRemoved = removedBands.includes(bandSelected);

        if (isAddBandBack && wasActuallyRemoved) {
            addToPendingForAddition(bandSelected);
        } else if (isAddBandBack && !wasActuallyRemoved) {
            removeFromPendingForRemoval(bandSelected);
        } else if (!isAddBandBack && wasActuallyRemoved) {
            removeFromPendingForAddition(bandSelected);
        } else {
            addToPendingForRemoval(bandSelected);
        }
    }

    return (
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end'}}>
            <FormControl className={classes.formControl}>
                <Select
                    multiple
                    value={[...removedBands, ...pendingForRemoval].filter(bandName => !pendingForAddition.includes(bandName))}
                    onChange={(event) => {
                        insanity(event);
                    }}
                    displayEmpty
                    input={<Input/>}
                    renderValue={() =>
                        pendingForRemoval.length !== 0 || pendingForAddition.length !== 0 ?
                            (
                                <div>{`${pendingForRemoval.length} pending removal and ${pendingForAddition.length} pending addition`}</div>) :
                            (<div>{`${removedBands.length} band(s) have currently been removed.`}</div>)
                    }
                    MenuProps={MenuProps}
                >
                    {allBandDropDownOptions
                        .sort((a, b) => a.name < b.name ? -1 : 1)
                        .map((option) => (
                        <MenuItem key={option.id} value={option.name}>
                            <Checkbox checked={isChecked(option)}/>
                            <ListItemText primary={option.name}/>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button onClick={onRemoveBand}>Confirm</Button>
        </div>
    );
};

export default CompetitionBandsMultiSelectCheckboxDropdown;