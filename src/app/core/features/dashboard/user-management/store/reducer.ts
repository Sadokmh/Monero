import {UserTypes} from './types'

export interface UserState {
    users: [],
    selectedUser: {},
    error: any,
    roles: []
};

const initialState: UserState = {
    users: [],
    selectedUser: {},
    error: null,
    roles: []
}


export const userReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case UserTypes.GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                error: {}
            };
        case UserTypes.GET_USER_BY_ID_SUCCESS:
            return {
                ...state,
                selectedUser: action.payload,
                error: {}
            };

        case UserTypes.ADD_USER_SUCCESS:
            const newUser = action.payload;
            const newUsers = {
                ...state.users,
                newUser
            };
            return {
                ...state,
                users: newUsers,
                error: {}
            };

        case UserTypes.UPDATE_USER_SUCCESS:
            console.log(state);
            const updatedUsers = state.users.map((user: any) => user.id === action.payload.id ? action.payload : user);
            return {
                ...state,
                users: updatedUsers,
                error: {}
            };

        case UserTypes.DELETE_USER_SUCCESS:
            const users = state.users.filter((user: any) => user.id !== action.payload.id);
            return {
                ...state,
                users: users,
                error: {}
            };

        case UserTypes.GET_ROLES_SUCCESS:
            return {
                ...state,
                roles: action.payload,
                error: {}
            };

        case UserTypes.THROW_ERROR: 
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}