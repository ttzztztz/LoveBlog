import { UserStore } from "./User";
import { userReducer } from "./User";
import { combineReducers } from "redux";

export interface StoreState {
    user: UserStore;
}

export const reducers = combineReducers({
    user: userReducer
});
