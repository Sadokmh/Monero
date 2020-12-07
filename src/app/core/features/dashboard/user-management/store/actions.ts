import { Action } from '@ngrx/store';
import {UserTypes} from './types';


export class GetUsers implements Action {
    readonly type = UserTypes.GET_USERS;
    constructor() {}
}

export class GetUsersSuccess implements Action {
    readonly type = UserTypes.GET_USERS_SUCCESS;
    constructor(public payload: []) {}
}

export class GetUserById implements Action {
    readonly type = UserTypes.GET_USER_BY_ID;
    constructor(public payload: string) {}
}

export class GetUserByIdSuccess implements Action {
    readonly type = UserTypes.GET_USER_BY_ID_SUCCESS;
    constructor(public payload: any) {}
}

export class AddUser implements Action {
    readonly type = UserTypes.ADD_USER;
    constructor(public payload: any) {}
}

export class AddUserSuccess implements Action {
    readonly type = UserTypes.ADD_USER_SUCCESS;
    constructor(public payload: any) {}
}

export class UpdateUser implements Action {
    readonly type = UserTypes.UPDATE_USER;
    constructor(public payload: any) {}
}

export class UpdateUserSuccess implements Action {
    readonly type = UserTypes.UPDATE_USER_SUCCESS;
    constructor(public payload: any) {}
}

export class DeleteUser implements Action {
    readonly type = UserTypes.DELETE_USER;
    constructor(public payload: any) {}
}

export class DeleteUserSuccess implements Action {
    readonly type = UserTypes.DELETE_USER_SUCCESS;
    constructor(public payload: any) {}
}

export class GetRoles implements Action {
    readonly type = UserTypes.GET_ROLES;
    constructor() {}
}

export class GetRolesSuccess implements Action {
    readonly type = UserTypes.GET_ROLES_SUCCESS;
    constructor(public payload: any) {}
}

export class AddRole implements Action {
    readonly type = UserTypes.ADD_ROLE;
    constructor(public payload: any) {}
}

export class AddRoleSuccess implements Action {
    readonly type = UserTypes.ADD_USER_SUCCESS;
    constructor(public payload: any) {}
}

export class UpdateRole implements Action {
    readonly type = UserTypes.UPDATE_ROLE;
    constructor(public payload: any) {}
}

export class UpdateRoleSuccess implements Action {
    readonly type = UserTypes.ADD_ROLE;
    constructor(public payload: any) {}
}

export class ThrowError implements Action {
    readonly type = UserTypes.THROW_ERROR;
    constructor(public payload: any) {}
}


export type AuthActions = GetUsers | GetUsersSuccess | GetUserById | 
GetUserByIdSuccess | AddUser | AddUserSuccess | UpdateUser | 
UpdateUserSuccess | DeleteUser | DeleteUserSuccess |
 AddRole | AddRoleSuccess | UpdateRole | UpdateRoleSuccess |
  GetRoles | GetRolesSuccess | ThrowError