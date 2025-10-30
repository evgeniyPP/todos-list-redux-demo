import { createAsyncThunk } from '@reduxjs/toolkit';
import { compareSync } from 'bcryptjs';

import { type User } from '../../models';

export const login = createAsyncThunk<User, { email: string; password: string }>(
  'user/login',
  async ({ email, password }) => {
    const response = await fetch('http://localhost:5001/users');

    const users = (await response.json()) as User[];
    const user = users.find(user => user.email === email);
    if (!user) {
      throw new Error('Неверные данные');
    }

    const isPasswordMatch = compareSync(password, user.password);
    if (!isPasswordMatch) {
      throw new Error('Неверные данные');
    }

    return user;
  }
);
