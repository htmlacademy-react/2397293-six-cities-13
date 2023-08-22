import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApi } from '../../types/state';
import { dropToken, saveToken } from '../../services/token';
import { ServerUser } from '../../types/types';
import { Endpoint } from '../../constants';

const checkAuth = createAsyncThunk<ServerUser, undefined, ThunkApi>(
	'auth/checkAuth',
	async (_arg, { extra: api }) => {
		const response = await api.get<ServerUser>(Endpoint.Login);
		return response.data;
	}
);

interface LoginData {
	email: string;
	password: string;
}

const loginAction = createAsyncThunk<ServerUser, LoginData, ThunkApi>(
	'auth/login',
	async (body, { extra: api }) => {
		const response = await api.post<ServerUser>(Endpoint.Login, body);
		saveToken(response.data.token);
		return response.data;
	}
);

const logout = createAsyncThunk<unknown, undefined, ThunkApi>(
	'auth/logout',
	async (_, { extra: api }) => {
		await api.delete(Endpoint.Logout).then(dropToken);
	}
);

export { checkAuth, loginAction, logout };
