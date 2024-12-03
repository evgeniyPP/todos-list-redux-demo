import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type Todo } from '../../models';

export type TodosState = {
  todos: Todo[];
};

const initialState: TodosState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<{ todos: Todo[] }>) => {
      state.todos = action.payload.todos;
    },
    addTodo: (state, action: PayloadAction<{ newTodo: Todo }>) => {
      state.todos.push(action.payload.newTodo);
    },
    completeTodo: (state, action: PayloadAction<{ completedTodo: Todo }>) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.completedTodo.id);
      state.todos[index] = action.payload.completedTodo;
    },
    deleteTodo: (state, action: PayloadAction<{ deletedTodo: Todo }>) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.deletedTodo.id);
      state.todos.splice(index, 1);
    },
  },
});

export const { setTodos, addTodo, completeTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
