import {BitterJesterApplication} from "../../pages/Submissions";
import {JudgesInfo} from "../../pages/OriginalSongCompetition";
import {LAST_SAVE_VERSION, Schedule} from "../../containers/ScheduleContainer";

type SelectedCompetitionReduxState = SelectedCompetition & {
    allBandDropDownOptions: any[];
    removedBands: any[];
    schedule: Schedule;
}

type SelectedCompetition = {
    bands: BitterJesterApplication[];
    endDate: Date | string;
    id: string;
    judges: JudgesInfo[];
    name: string;
    startDate: Date | string;
    type: 'inPerson' | 'online' | ''
}

export const INITIAL_SCHEDULE: Schedule = {
    fridayNightOne: [],
    fridayNightTwo: [],
    fridayNightThree: [],
    fridayNightFour: [],
    nights: [],
    version: LAST_SAVE_VERSION
};

export const SELECTED_COMPETITION_REDUCER_INITIAL_STATE: SelectedCompetitionReduxState = {
    id: '',
    name: '',
    bands: [],
    judges: [],
    startDate: '',
    endDate: '',
    type: '',
    allBandDropDownOptions: [],
    removedBands: [],
    schedule: INITIAL_SCHEDULE,
};

export default function selectedCompetitionReducer(state = SELECTED_COMPETITION_REDUCER_INITIAL_STATE, action) {
    switch (action.type) {
        case 'competition/set':
            const selectedCompetition: SelectedCompetitionReduxState = action.payload.selectedCompetition;
            return {
                ...state,
                ...selectedCompetition
            }
        case 'competition/set-bands':
            return {
                ...state,
                bands: action.payload.bands,
                allBandDropDownOptions: action.payload.bands.map(band => ({id: band.bandName, name: band.bandName}))
            }
        case 'competition/set-removed-bands':
            return {
                ...state,
                removedBands: action.payload.removedBands
            }
        case 'competition/set-schedule':
            return {
                ...state,
                schedule: action.payload.schedule
            }
        default:
            return state
    }
}