import { createSlice } from '@reduxjs/toolkit';

import { type Todo } from '../../models';
import { completeTodo, createTodo, deleteTodo, readTodos } from './thunks';

export type TodosState = {
  todos: Todo[];
};

const initialState: TodosState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(readTodos.fulfilled, (state, { payload }) => {
        state.todos = payload;
      })
      .addCase(createTodo.fulfilled, (state, { payload }) => {
        state.todos.push(payload);
      })
      .addCase(completeTodo.fulfilled, (state, { payload }) => {
        const changedIndex = state.todos.findIndex(todo => todo.id === payload.id);
        state.todos[changedIndex] = payload;
      })
      .addCase(deleteTodo.fulfilled, (state, { payload }) => {
        state.todos = state.todos.filter(todo => todo.id !== payload.id);
      });
  },
});

export default todoSlice.reducer;
