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
  name: 'todos',
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
        const deletedIndex = state.todos.findIndex(todo => todo.id === payload.id);
        state.todos.splice(deletedIndex, 1);
      });
  },
});

export default todoSlice.reducer;
