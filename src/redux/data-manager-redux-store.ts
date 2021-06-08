import {combineReducers, createStore} from 'redux'
import appInfoReducer from "./reducers/appInfoReducer";

export interface DataManagerReduxStore {
    appInfo: any;
}

const reducers: DataManagerReduxStore = {
    appInfo: appInfoReducer,
};
const dataManagerReduxStore = createStore(
    combineReducers(reducers)
);

export default dataManagerReduxStore;
