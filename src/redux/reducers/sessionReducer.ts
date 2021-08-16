interface SessionReducerState {
    signInUserSession: any;
    authState: any;
    isAdmin: boolean;
}

const initialState: SessionReducerState = {
    signInUserSession: {},
    authState: {},
    isAdmin: false,
};

export default function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case 'signInUserSession/set':
            const {authState, authData} = action.payload;
            const usersAssignedGroups = authData ? authData.signInUserSession.accessToken.payload['cognito:groups'] : [];
            const isAdmin = usersAssignedGroups && usersAssignedGroups.length && usersAssignedGroups.includes('admin');
            return {
                ...state,
                isAdmin,
                name: authData ? authData.attributes.name : '',
                email: authData ? authData.attributes.email : '',
                phoneNumber: authData ? authData.attributes.phone_number : '',
                signInUserSession: authData ? authData.signInUserSession : null,
                authState
            }
        default:
            return state
    }
}