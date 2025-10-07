import { type Todo } from '../../models';
import { type TodoActionTypes } from './actions';

type State = {
  todos: Todo[];
};

const initialState: State = {
  todos: [],
};

export function todosReducer(state = initialState, action: TodoActionTypes): State {
  switch (action.type) {
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.todos,
      };

    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.todo],
      };

    case 'COMPLETE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo => (todo.id === action.todo.id ? action.todo : todo)),
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.todo.id),
      };

    default:
      return state;
  }
}
