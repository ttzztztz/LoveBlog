import { ofType } from "redux-observable";
import {
    UserLogout,
    UserLogin,
    USER_LOGIN,
    USER_LOGOUT,
    USER_GET_INFO,
    userSetInfo,
    userLogout,
    UserGetInfo
} from "../Actions";
import { GET_USER } from "../Models/Query";
import { Epic } from "../Epics";
import { of, from } from "rxjs";
import { mergeMap, tap } from "rxjs/operators";
import client from "../Models/ApolloClient";

const userLoginEpic: Epic<UserLogin> = (action$, _store$) => action$.pipe(ofType(USER_LOGIN));

const userLogoutEpic: Epic<UserLogout> = (action$, _store$, { localStorage }) =>
    action$.pipe(
        ofType(USER_LOGOUT),
        tap(() => localStorage.removeItem("token")),
        mergeMap(() => of(userLogout()))
    );

const getUserEpic: Epic<UserGetInfo> = action$ =>
    action$.pipe(
        ofType(USER_GET_INFO),
        mergeMap(({ payload: id }) =>
            from(client.query({ query: GET_USER(id) })).pipe(
                mergeMap(response => {
                    console.log(response);
                    return of(userSetInfo());
                })
            )
        )
    );

export default [userLoginEpic, userLogoutEpic, getUserEpic];
