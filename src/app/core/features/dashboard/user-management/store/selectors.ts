import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from './reducer';

const userSelectors = createFeatureSelector<UserState>('users');

export const getSelectedUser = createSelector(
    userSelectors,
    (state:any) => state.selectedUser
);

export const getUsers = createSelector(
    userSelectors,
    (state:any) => state.users
);

export const getRoles = createSelector(
    userSelectors,
    (state:any) => state.roles
);

export const getUsersPaginationConfig = createSelector(
    userSelectors,
    (state:any) => state.paginationConfig
);

export const getUserError = createSelector(
    userSelectors,
    (state:any) => state.error
);