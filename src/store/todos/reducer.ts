import { type Todo } from '../../models';
import { type TodoActionTypes } from './actions';

export function todosReducer(state: Todo[] = [], action: TodoActionTypes): Todo[] {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        { id: Date.now().toString(), text: action.payload.text, isCompleted: false },
      ];

    case 'COMPLETE_TODO':
      return state.map(todo =>
        todo.id === action.payload.id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );

    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload.id);

    default:
      return state;
  }
}
