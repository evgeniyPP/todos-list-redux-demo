import { type Todo } from '../../models';

// export const SET_TODOS = 'SET_TODOS';
// export const ADD_TODO = 'ADD_TODO';
// export const COMPLETE_TODO = 'COMPLETE_TODO';
// export const DELETE_TODO = 'DELETE_TODO';

type SetTodosAction = {
  type: 'SET_TODOS';
  todos: Todo[];
};

type AddTodoAction = {
  type: 'ADD_TODO';
  todo: Todo;
};

type CompleteTodoAction = {
  type: 'COMPLETE_TODO';
  todo: Todo;
};

type DeleteTodoAction = {
  type: 'DELETE_TODO';
  todo: Todo;
};

export type TodoActionTypes =
  | SetTodosAction
  | AddTodoAction
  | CompleteTodoAction
  | DeleteTodoAction;
