import * as auth0 from '../src/react-auth0-spa';

// @ts-ignore
jest.spyOn(auth0, 'useAuth0').mockImplementation(x => ({
    user: {
        nickname: 'nickname'
    },
    isAuthenticated: true,
    isInitializing: false,
    isPopupOpen: false
}));
