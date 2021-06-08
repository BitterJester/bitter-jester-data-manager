import {combineReducers, createStore} from 'redux'
import appInfoReducer from "./reducers/appInfoReducer";
import selectedCompetitionReducer from "./reducers/selectedCompetitionReducer";

export interface DataManagerReduxStore {
    appInfo: any;
    selectedCompetition: any;
}

const reducers: DataManagerReduxStore = {
    appInfo: appInfoReducer,
    selectedCompetition: selectedCompetitionReducer,
};
const dataManagerReduxStore = createStore(
    combineReducers(reducers)
);

export default dataManagerReduxStore;
