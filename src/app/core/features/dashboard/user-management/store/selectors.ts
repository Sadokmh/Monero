import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from './reducer';

const userSelectors = createFeatureSelector<UserState>('users');

export const getSelectedUser = createSelector(
    userSelectors,
    state => state.selectedUser
);

export const getUsers = createSelector(
    userSelectors,
    state => state.users
);

export const getUserError = createSelector(
    userSelectors,
    state => state.error
);