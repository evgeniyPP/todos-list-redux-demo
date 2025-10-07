import { v4 as uuidv4 } from 'uuid';

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
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, { id: uuidv4(), text: action.newText, isCompleted: false }],
      };

    case 'COMPLETE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        ),
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      };

    default:
      return state;
  }
}
