import AuthTypes from './auth.types'

export interface AuthState {
    user: {},
    token: string,
    isLoggedIn: boolean,
    isRegistred: boolean,
    isActivate: boolean
};

const initialState: AuthState = {
    user: {},
    token: '',
    isLoggedIn: false,
    isRegistred: false,
    isActivate: false
}


export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case AuthTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isRegistred: true,
                error: {}
            };
        case AuthTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user,
                token: action.payload.token,
                error: {}
            };

        case AuthTypes.LOGOUT: 
            return {
                ...state,
                isLoggedIn: false,
                user: {},
                token: ''
            }

        case AuthTypes.THROW_ERROR: 
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}