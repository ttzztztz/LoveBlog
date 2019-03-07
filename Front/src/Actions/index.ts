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
