type AddTodoAction = {
  type: 'ADD_TODO';
  payload: { text: string };
};

type CompleteTodoAction = {
  type: 'COMPLETE_TODO';
  payload: { id: string };
};

type DeleteTodoAction = {
  type: 'DELETE_TODO';
  payload: { id: string };
};

export type TodoActionTypes = AddTodoAction | CompleteTodoAction | DeleteTodoAction;
