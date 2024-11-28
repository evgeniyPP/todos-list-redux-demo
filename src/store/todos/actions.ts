import { type Todo } from '../../models';

type SetTodosAction = {
  type: 'SET_TODOS';
  payload: { todos: Todo[] };
};

type AddTodoAction = {
  type: 'ADD_TODO';
  payload: { newTodo: Todo };
};

type CompleteTodoAction = {
  type: 'COMPLETE_TODO';
  payload: { completedTodo: Todo };
};

type DeleteTodoAction = {
  type: 'DELETE_TODO';
  payload: { deletedTodo: Todo };
};

export type TodoActionTypes =
  | SetTodosAction
  | AddTodoAction
  | CompleteTodoAction
  | DeleteTodoAction;
