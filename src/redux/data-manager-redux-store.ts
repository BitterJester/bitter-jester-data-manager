import {combineReducers, createStore} from 'redux'
import appInfoReducer from "./reducers/appInfoReducer";
import selectedCompetitionReducer from "./reducers/selectedCompetitionReducer";
import uploadedFilesReducer from "./reducers/uploadedFilesReducer";
import sessionReducer from "./reducers/sessionReducer";

export interface DataManagerReduxStore {
    appInfo: any;
    signInUserSession: any;
    selectedCompetition: any;
    uploadedFiles: any;
}

const reducers: DataManagerReduxStore = {
    appInfo: appInfoReducer,
    signInUserSession: sessionReducer,
    selectedCompetition: selectedCompetitionReducer,
    uploadedFiles: uploadedFilesReducer,
};
const dataManagerReduxStore = createStore(
    combineReducers(reducers)
);

export default dataManagerReduxStore;
