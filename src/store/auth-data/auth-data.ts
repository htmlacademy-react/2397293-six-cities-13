import { createSlice } from '@reduxjs/toolkit';
import { AuthStatus, RequestStatus } from '../../constants';
import { ServerUser } from '../../types/types';
import { checkAuth, loginAction, logout } from '../thunks/auth';

const initialState: {
	authorizationStatus: AuthStatus;
	authData: ServerUser | null;
	statusFetchingAuthData: RequestStatus;
} = {
	authorizationStatus: AuthStatus.Unknown,
	authData: null,
	statusFetchingAuthData: RequestStatus.Idle,
};

export const authData = createSlice({
	name: 'authData',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(loginAction.fulfilled, (state, action) => {
			state.authData = action.payload;
			state.authorizationStatus = AuthStatus.Auth;
			state.statusFetchingAuthData = RequestStatus.Success;
		});
		builder.addCase(loginAction.pending, (state) => {
			state.statusFetchingAuthData = RequestStatus.Loading;
		});
		builder.addCase(loginAction.rejected, (state) => {
			state.statusFetchingAuthData = RequestStatus.Failed;
		});
		builder.addCase(checkAuth.fulfilled, (state, action) => {
			state.authData = action.payload;
			state.authorizationStatus = AuthStatus.Auth;
		});
		builder.addCase(checkAuth.rejected, (state) => {
			state.authorizationStatus = AuthStatus.NotAuth;
		});
		builder.addCase(logout.fulfilled, (state) => {
			state.authorizationStatus = AuthStatus.NotAuth;
		});
	},
});

export const authActions = {
	...authData.actions,
	loginAction,
	checkAuth,
	logout,
};
