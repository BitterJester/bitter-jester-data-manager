import {BitterJesterApplication} from "../../pages/Submissions";
import {JudgesInfo} from "../../pages/OriginalSongCompetition";

type SelectedCompetitionReduxState = SelectedCompetition & {
    allBandDropDownOptions: any[];
    removedBands: any[];
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

const initialState: SelectedCompetitionReduxState = {
    id: '',
    name: '',
    bands: [],
    judges: [],
    startDate: '',
    endDate: '',
    type: '',
    allBandDropDownOptions: [],
    removedBands: [],
};

export default function selectedCompetitionReducer(state = initialState, action) {
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
        default:
            return state
    }
}