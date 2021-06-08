interface SelectedCompetitionReduxState {
    id: string;
    name: string;
}

const initialState: SelectedCompetitionReduxState = {
    id: '',
    name: '',
};

export default function selectedCompetitionReducer(state = initialState, action) {
    switch (action.type) {
        case 'competition/set':
            return {
                ...state,
                ...action.payload.selectedCompetition,
            }
        default:
            return state
    }
}