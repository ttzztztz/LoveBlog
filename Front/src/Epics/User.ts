import { ofType } from "redux-observable";
import { UserLogout, UserLogin, USER_LOGIN, USER_LOGOUT, userLogin, userLogout } from "../Actions";
import { Epic } from "../Epics";
import { of } from "rxjs";
import { mergeMap, tap } from "rxjs/operators";

const userLoginEpic: Epic<UserLogin> = action$ => action$.pipe(ofType(USER_LOGIN));

const userLogoutEpic: Epic<UserLogout> = (action$, _store$, { localStorage }) =>
    action$.pipe(
        ofType(USER_LOGOUT),
        tap(() => localStorage.removeItem("token")),
        mergeMap(() => of(userLogout()))
    );

export default [userLoginEpic, userLogoutEpic];
