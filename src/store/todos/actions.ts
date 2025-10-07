// export const ADD_TODO = 'ADD_TODO';
// export const COMPLETE_TODO = 'COMPLETE_TODO';
// export const DELETE_TODO = 'DELETE_TODO';

type AddTodoAction = {
  type: 'ADD_TODO';
  newText: string;
};

type CompleteTodoAction = {
  type: 'COMPLETE_TODO';
  id: string;
};

type DeleteTodoAction = {
  type: 'DELETE_TODO';
  id: string;
};

export type TodoActionTypes = AddTodoAction | CompleteTodoAction | DeleteTodoAction;
