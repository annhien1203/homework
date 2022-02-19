import { combineReducers } from "redux";
import contact from "./infoContact";
const reducers = combineReducers({
    contactinfo : contact
});

export default (state, action) => reducers(state, action);