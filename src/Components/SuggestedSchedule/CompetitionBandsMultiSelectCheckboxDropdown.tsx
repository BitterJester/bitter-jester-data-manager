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
import {getFromS3} from "../../aws/getFromS3";
import {Schedule} from "../../containers/ScheduleContainer";
import BitterJesterApiRequest, {API_URL_PATH_FUNCTIONS} from "../../utils/bitter-jester-api-request";

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
    const {removedBands, allBandDropDownOptions} = useSelector((state: DataManagerReduxStore) => {
        return {
            allBandDropDownOptions: state.selectedCompetition.allBandDropDownOptions,
            removedBands: state.selectedCompetition.removedBands
        };
    });
    const [pendingForRemoval, setPendingForRemoval] = useState([]);
    const [pendingForAddition, setPendingForAddition] = useState([]);

    const s3Client = new S3Client();

    const fetch = async () => {
        await getFromS3('removed-bands.json', (removedBands) => {
            const extracted = removedBands.removedBands;
            return dataManagerReduxStore.dispatch({
                type: 'competition/set-removed-bands',
                payload: {removedBands: extracted}
            });
        });
    }

    useEffect(() => {
        fetch();
    }, [])

    const onRemoveBand = async () => {
        const updatedRemovedBands = [...removedBands, ...pendingForRemoval].filter(pend => !pendingForAddition.includes(pend));
        setPendingForRemoval([]);
        setPendingForAddition([]);
        dataManagerReduxStore.dispatch({
            type: 'competition/set-removed-bands',
            payload: {removedBands: updatedRemovedBands}
        });
        await s3Client.put(s3Client.createPutPublicJsonRequest(
            'bitter-jester-test',
            'removed-bands.json',
            JSON.stringify({removedBands: updatedRemovedBands})
        ));
        const updatedSchedule = await BitterJesterApiRequest.get<Schedule>(API_URL_PATH_FUNCTIONS.GET_SCHEDULE);
        dataManagerReduxStore.dispatch({
            type: 'competition/set-schedule',
            payload: {schedule: updatedSchedule}
        });
    };

    const isChecked = (option) => {
        return pendingForRemoval.filter(removedBandName => removedBandName === option.id).length === 1 ||
            removedBands.filter(removedBandName => removedBandName === option.id && !pendingForAddition.includes(removedBandName)).length === 1;
    }

    const addToPendingForAddition = (toAdd) => {
        setPendingForAddition([...pendingForAddition, toAdd]);
    };

    const addToPendingForRemoval = (toAdd) => {
        setPendingForRemoval([...pendingForRemoval, toAdd]);
    }

    const removeFromPendingForAddition = (toRemove) => {
        setPendingForAddition(pendingForAddition.filter(pend => pend !== toRemove));
    }

    const removeFromPendingForRemoval = (toRemove) => {
        setPendingForRemoval(pendingForRemoval.filter(pend => pend !== toRemove));
    }

    const insanity = (event) => {
        const updatedSelectedCombined = event.target.value as string[];
        const allRemoval = [...removedBands, ...pendingForRemoval].filter(pend => !pendingForAddition.includes(pend));
        const isAddBandBack = allRemoval.length > updatedSelectedCombined.length;
        const bandSelected = isAddBandBack ? allRemoval.filter(b => !updatedSelectedCombined.includes(b))[0] : updatedSelectedCombined.filter(b => !allRemoval.includes(b))[0];
        const wasActuallyRemoved = removedBands.includes(bandSelected);

        if(isAddBandBack && wasActuallyRemoved) {
            addToPendingForAddition(bandSelected);
        }else if(isAddBandBack && !wasActuallyRemoved){
            removeFromPendingForRemoval(bandSelected);
        }
        else if(!isAddBandBack && wasActuallyRemoved){
            removeFromPendingForAddition(bandSelected);
        } else {
            addToPendingForRemoval(bandSelected);
        }
    }

    return (
        <div style={{display: 'inline-flex', textAlign: 'right', alignItems: 'center'}}>
            <FormControl className={classes.formControl}>
                <InputLabel>Remove Bands</InputLabel>
                <Select
                    multiple
                    value={[...removedBands, ...pendingForRemoval].filter(bandName => !pendingForAddition.includes(bandName))}
                    onChange={(event) => {
                        insanity(event);
                    }}
                    input={<Input/>}
                    renderValue={() =>
                        pendingForRemoval.length !== 0 || pendingForAddition.length !== 0 ?
                            (<div>{`${pendingForRemoval.length} pending removal and ${pendingForAddition.length} pending addition`}</div>):
                            (<div>{`${removedBands.length} band(s) removed`}</div>)
                    }
                    MenuProps={MenuProps}
                >
                    {allBandDropDownOptions.map((option) => (
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