import {combineReducers, createStore} from 'redux'
import appInfoReducer from "./reducers/appInfoReducer";
import selectedCompetitionReducer from "./reducers/selectedCompetitionReducer";
import uploadedFilesReducer from "./reducers/uploadedFilesReducer";

export interface DataManagerReduxStore {
    appInfo: any;
    selectedCompetition: any;
    uploadedFiles: any;
}

const reducers: DataManagerReduxStore = {
    appInfo: appInfoReducer,
    selectedCompetition: selectedCompetitionReducer,
    uploadedFiles: uploadedFilesReducer,
};
const dataManagerReduxStore = createStore(
    combineReducers(reducers)
);

export default dataManagerReduxStore;
