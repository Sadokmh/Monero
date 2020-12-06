import { Action } from '@ngrx/store';
import AuthTypes from './auth.types';


export class Login implements Action {
    readonly type = AuthTypes.LOGIN_START;
    constructor(public payload: {email: string, password: string}) {}
}

export class LoginSuccess implements Action {
    readonly type = AuthTypes.LOGIN_SUCCESS;
    constructor(public payload: any) {}
}

export class Register implements Action {
    readonly type = AuthTypes.REGISTER_START;
    constructor(public payload: any) {}
}

export class RegisterSuccess implements Action {
    readonly type = AuthTypes.REGISTER_SUCCESS;
    constructor(public payload: any) {}
}

export class AutoLogin implements Action {
    readonly type = AuthTypes.AUTO_LOGIN;
    constructor(public payload: any) {}
}

export class Logout implements Action {
    readonly type = AuthTypes.LOGOUT;
    constructor() {}
}

export class ThrowError implements Action {
    readonly type = AuthTypes.THROW_ERROR;
    constructor(public payload: any) {}
}


export type AuthActions = Login | LoginSuccess | Register | RegisterSuccess | AutoLogin | Logout | ThrowError