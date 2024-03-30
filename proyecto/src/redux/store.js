import {createStore, combineReducers} from "redux";

import counterReducer from "./reducers/counterReducer";
import authReducer from "./reducers/authReducer";

const appReducer = combineReducers({
    counterReducer: counterReducer,
    authReducer: authReducer,
});

export default createStore(appReducer);