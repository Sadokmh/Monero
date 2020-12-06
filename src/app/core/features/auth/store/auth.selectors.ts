import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from './auth.effects';

const authSelectors = createFeatureSelector<AuthState>('auth');

export const getUser = createSelector(
    authSelectors,
    state => state.user
);

export const getToken = createSelector(
    authSelectors,
    state => state.token
);

export const getIsLoggedIn = createSelector(
    authSelectors,
    state => state.isLoggedIn
);