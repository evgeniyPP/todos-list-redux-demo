import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { v4 as uuidv4 } from 'uuid';

import { type Todo } from '../models';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001/' }),
  tagTypes: ['Todo'],
  endpoints: builder => ({
    readTodos: builder.query<Todo[], void>({
      query: () => 'posts',
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Todo', id }) as const),
              { type: 'Todo', id: 'LIST' },
            ]
          : [{ type: 'Todo', id: 'LIST' }],
    }),
    createTodo: builder.mutation<Todo, string>({
      query: text => ({
        url: 'posts',
        method: 'POST',
        body: { id: uuidv4(), text, isCompleted: false },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: [{ type: 'Todo', id: 'LIST' }],
    }),
    completeTodo: builder.mutation<Todo, { id: string; isCompleted: boolean }>({
      query: ({ id, isCompleted }) => ({
        url: `posts/${id}`,
        method: 'PATCH',
        body: { isCompleted: !isCompleted },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Todo', id }],
    }),
    deleteTodo: builder.mutation<Todo, string>({
      query: id => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Todo', id }],
    }),
  }),
});

export const {
  useReadTodosQuery,
  useCreateTodoMutation,
  useCompleteTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
