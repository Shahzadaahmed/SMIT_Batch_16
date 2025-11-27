// Main reducer file...!

import { combineReducers } from "redux";
import authReducer from "./auth-reducer/auth-reducer";

const rootReducer = combineReducers({
    authStates: authReducer,
});

export default rootReducer;