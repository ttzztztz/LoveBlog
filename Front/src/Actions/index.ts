export const USER_LOGIN = "USER_LOGIN";
export type USER_LOGIN = typeof USER_LOGIN;
export interface UserLogin {
    type: USER_LOGIN;
    uid: string;
    role: string;
}
export function userLogin(uid: string, role: string) {
    return {
        type: USER_LOGIN,
        uid: uid,
        role: role
    };
}

export const USER_LOGOUT = "USER_LOGOUT";
export type USER_LOGOUT = typeof USER_LOGOUT;
export interface UserLogout {
    type: USER_LOGOUT;
}
export function userLogout() {
    return {
        type: USER_LOGOUT
    };
}

export const USER_GET_INFO = "USER_GET_INFO";
export type USER_GET_INFO = typeof USER_GET_INFO;
export interface UserGetInfo {
    type: USER_GET_INFO;
    payload: string;
}
export function userGetInfo(id: string): UserGetInfo {
    return {
        type: USER_GET_INFO,
        payload: id
    };
}

export const USER_SET_INFO = "USER_SET_INFO";
export type USER_SET_INFO = typeof USER_SET_INFO;
export interface UserSetInfo {
    type: USER_SET_INFO;
}
export function userSetInfo(): UserSetInfo {
    return {
        type: USER_SET_INFO
    };
}
