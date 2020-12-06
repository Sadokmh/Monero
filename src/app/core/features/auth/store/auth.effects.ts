import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth.service';
import * as AuthActions from './auth.actions';
import AuthTypes from './auth.types';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';



@Injectable()
export class AuthEffects {
    constructor(
        private $actions: Actions,
        private authService: AuthService,
        private router: Router
    ) {}

    @Effect()
    login$ = this.$actions.pipe(
        ofType(AuthTypes.LOGIN_START),
        map((action: AuthActions.Login) => action.payload),
        mergeMap((requestData) => this.authService.login(requestData).pipe(
            map(({user, token}: any) => {
                localStorage.setItem('user', user);
                localStorage.setItem('token', token);
                this.router.navigate(['/dashboard']);
                return new AuthActions.LoginSuccess(user);
            }),
            catchError((error: any) => of(new AuthActions.ThrowError(error)))
        ))
    );


    register$ = this.$actions.pipe(
        ofType(AuthTypes.REGISTER_START),
        map((action: AuthActions.Register) => action.payload),
        mergeMap((requestData) => this.authService.register(requestData).pipe(
            map((result: any) => {


                return new AuthActions.RegisterSuccess(result);
            }),
            catchError((error: any) => of(new AuthActions.ThrowError(error)))
        ))
    );


}

