import { createAsyncThunk } from '@reduxjs/toolkit';
import { compareSync, hashSync } from 'bcryptjs';

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

export const updateUser = createAsyncThunk<
  User,
  {
    id: string;
    newEmail: string;
    newPassword?: string;
  }
>('user/update', async ({ id, newEmail, newPassword }) => {
  const users = (await fetch('http://localhost:5001/users').then(res => res.json())) as User[];
  const user = users.find(user => user.id === id);
  if (!user) {
    throw new Error('Неверные данные');
  }

  const response = await fetch(`http://localhost:5001/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      id: user.id,
      email: newEmail,
      password: newPassword ? hashSync(newPassword, 10) : user.password,
    }),
  });

  return (await response.json()) as User;
});
