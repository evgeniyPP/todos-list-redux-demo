import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { type Todo } from '../../models';

export const readTodos = createAsyncThunk<Todo[], { userId: string }>(
  'todos/readTodos',
  async params => {
    const url = new URL('/posts', 'http://localhost:5001');
    Object.entries(params).forEach(([name, value]) => {
      url.searchParams.set(name, value);
    });

    const response = await fetch(url);

    return await response.json();
  }
);

export const createTodo = createAsyncThunk<Todo, string>('todos/createTodo', async text => {
  const response = await fetch('http://localhost:5001/posts', {
    method: 'POST',
    body: JSON.stringify({ id: uuidv4(), text, isCompleted: false }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
});

export const completeTodo = createAsyncThunk<Todo, { id: string; isCompleted: boolean }>(
  'todos/toggleTodoCompletion',
  async ({ id, isCompleted }) => {
    const response = await fetch(`http://localhost:5001/posts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ isCompleted: !isCompleted }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  }
);

export const deleteTodo = createAsyncThunk<Todo, string>('todos/deleteTodo', async id => {
  const response = await fetch(`http://localhost:5001/posts/${id}`, {
    method: 'DELETE',
  });

  return await response.json();
});
