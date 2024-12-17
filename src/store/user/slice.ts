import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { type User } from '../../models';
import { login, updateUser } from './thunks';

export type UserState = {
  user: User | null;
  error: string;
};

const initialState: UserState = {
  user: null,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.error = '';
      })
      .addCase(login.rejected, (state, { error }) => {
        state.user = null;
        state.error = error.message ?? 'Что-то пошло не так';
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.error = '';
      })
      .addCase(updateUser.rejected, (state, { error }) => {
        state.error = error.message ?? 'Что-то пошло не так';
      });
  },
});

export const { logout } = userSlice.actions;

export default persistReducer(
  { key: 'todos-list-redux-demo/user', storage, whitelist: ['user'] },
  userSlice.reducer
);
