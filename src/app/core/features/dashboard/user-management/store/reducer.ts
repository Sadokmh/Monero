import { Role } from '../models/Role';
import { User } from '../models/User'
import {UserTypes} from './types'

export interface UserState {
    users: Array<User>,
    selectedUser: User,
    error: any,
    roles: Array<Role>,
    paginationConfig: any
};

const initialState: UserState = {
    users: [],
    selectedUser: {id: '', first_name: '', last_name: '', email: '', is_active: false, role: {id: '', title: ''}, createdAt: '', updatedAt: ''},
    error: null,
    roles: [],
    paginationConfig: {has_next: false, next_page: 0}
}


export const userReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case UserTypes.GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload.result,
                paginationConfig: {has_next: action.payload.has_next, next_page: action.payload.next_page},
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
            const newUsers = [...state.users];
            console.log(newUsers);
            newUsers.push(newUser);
           
            return {
                ...state,
                users: newUsers,
                error: {}
            };

        case UserTypes.UPDATE_USER_SUCCESS:
            console.log(state);
            const updatedUsers = state.users.map((user: User) => user.id === action.payload.id ? action.payload : user);
            return {
                ...state,
                users: updatedUsers,
                error: {}
            };

        case UserTypes.DELETE_USER_SUCCESS:
            console.log(action.payload)
            const users = state.users.filter((user: User) => user.id !== action.payload);
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

        case UserTypes.SELECT_USER:
            return {
                ...state,
                selectedUser: action.payload
            }

        case UserTypes.THROW_ERROR: 
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}