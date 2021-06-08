interface AppInfoReducerState {
    competitions: any;
}

const initialState: AppInfoReducerState = {
    competitions: [],
};

export default function appInfoReducer(state = initialState, action) {
    switch (action.type) {
        case 'competitions/set':
            return {
                ...state,
                competitions: action.payload.competitions,
            }
        default:
            return state
    }
}