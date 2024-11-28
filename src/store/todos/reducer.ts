import { type Todo } from '../../models';
import { type TodoActionTypes } from './actions';

export function todosReducer(state: Todo[] = [], action: TodoActionTypes): Todo[] {
  switch (action.type) {
    case 'SET_TODOS':
      return action.payload.todos;

    case 'ADD_TODO':
      return [...state, action.payload.newTodo];

    case 'COMPLETE_TODO':
      return state.map(todo =>
        todo.id === action.payload.completedTodo.id ? action.payload.completedTodo : todo
      );

    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload.deletedTodo.id);

    default:
      return state;
  }
}
