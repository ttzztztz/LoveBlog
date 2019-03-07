import * as actions from "../Actions";

type Action = actions.UserLogin | actions.UserLogout;

export interface UserStore {
    uid: string;
    role: string;
    loginStatus: boolean;
}

const init: UserStore = {
    uid: "",
    role: "",
    loginStatus: false
};

export function userReducer(state = init, action: Action): UserStore {
    switch (action.type) {
        case actions.USER_LOGIN:
            const { uid, role } = action;
            return {
                ...state,
                uid: uid,
                role: role,
                loginStatus: true
            };
        case actions.USER_LOGOUT:
            return {
                ...state,
                uid: "",
                role: "",
                loginStatus: false
            };
    }
    return state;
}
