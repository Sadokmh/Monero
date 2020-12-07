import {AuthTypes} from './auth.types'

export interface AuthState {
    user: {},
    token: string,
    isLoggedIn: boolean,
    error: any
};

const initialState: AuthState = {
    user: {},
    token: '',
    isLoggedIn: false,
    error: null
}


export const authReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case AuthTypes.REGISTER_SUCCESS:
            return {
                ...state,
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
            localStorage.clear();
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