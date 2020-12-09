import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as UserActions from './actions';
import {UserTypes} from './types';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserManagementService } from '../user-management.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';



@Injectable()
export class UserEffects {
    constructor(
        private $actions: Actions,
        private userService: UserManagementService,
        private router: Router,
        private toaster: ToastrService
    ) {}

    @Effect()
    getUsers$ = this.$actions.pipe(
        ofType(UserTypes.GET_USERS),
        map((action: UserActions.GetUsers) => action),
        mergeMap((requestData) => this.userService.getUsers().pipe(
            map((response: any) => {
                return new UserActions.GetUsersSuccess(response);
            }),
            catchError((error: any) => of(new UserActions.ThrowError(error)))
        ))
    );

    @Effect()
    getUserById$ = this.$actions.pipe(
        ofType(UserTypes.GET_USER_BY_ID),
        map((action: UserActions.GetUserById) => action.payload),
        mergeMap((id) => this.userService.getUserById(id).pipe(
            map((user: any) => {
                return new UserActions.GetUserByIdSuccess(user);
            }),
            catchError((error: any) => of(new UserActions.ThrowError(error)))
        ))
    );

    @Effect()
    addUser$ = this.$actions.pipe(
        ofType(UserTypes.ADD_USER),
        map((action: UserActions.AddUser) => action.payload),
        mergeMap((requestData) => this.userService.addUser(requestData).pipe(
            map((user: any) => {
                console.log("con");
                
                this.toaster.success('User added successfuly !', 'Success');
                return new UserActions.AddUserSuccess(user);
            }),
            catchError((error: any) => of(new UserActions.ThrowError(error)))
        ))
    );

    @Effect()
    updateUser$ = this.$actions.pipe(
        ofType(UserTypes.UPDATE_USER),
        map((action: UserActions.UpdateUser) => action.payload),
        mergeMap((requestData) => this.userService.updateUser(requestData).pipe(
            map((user: any) => {
                this.toaster.success('User edited successfuly !', 'Success');
                return new UserActions.UpdateUserSuccess(user);
            }),
            catchError((error: any) => of(new UserActions.ThrowError(error)))
        ))
    );


    @Effect()
    deleteUser$ = this.$actions.pipe(
        ofType(UserTypes.DELETE_USER),
        map((action: UserActions.DeleteUser) => action.payload),
        mergeMap((id) => this.userService.deleteUser(id).pipe(
            map((result: any) => {
                this.toaster.success('User deleted successfuly !', 'Success');
                return new UserActions.DeleteUserSuccess(id);
            }),
            catchError((error: any) => of(new UserActions.ThrowError(error)))
        ))
    );

    @Effect()
    getRoles$ = this.$actions.pipe(
        ofType(UserTypes.GET_ROLES),
        map((action: UserActions.GetRoles) => action),
        mergeMap(() => this.userService.getRoles().pipe(
            map((roles: any) => {
                return new UserActions.GetRolesSuccess(roles);
            }),
            catchError((error: any) => of(new UserActions.ThrowError(error)))
        ))
    );
    
}

