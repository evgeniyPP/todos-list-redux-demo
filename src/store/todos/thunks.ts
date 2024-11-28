import { v4 as uuidv4 } from 'uuid';

import { type AppDispatch } from '..';
import { Todo } from '../../models';

export const readTodos = () => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch('http://localhost:5001/posts');
    const data = (await response.json()) as Todo[];

    dispatch({ type: 'SET_TODOS', payload: { todos: data } });
  } catch (error) {
    console.error('Ошибка при загрузке задач', error);
  }
};

export const createTodo = (text: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch('http://localhost:5001/posts', {
      method: 'POST',
      body: JSON.stringify({ id: uuidv4(), text, isCompleted: false }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = (await response.json()) as Todo;

    dispatch({ type: 'ADD_TODO', payload: { newTodo: data } });
  } catch (error) {
    console.error('Ошибка при добавлении задачи', error);
  }
};

export const completeTodo =
  ({ id, isCompleted }: { id: string; isCompleted: boolean }) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(`http://localhost:5001/posts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ isCompleted: !isCompleted }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = (await response.json()) as Todo;

      dispatch({ type: 'COMPLETE_TODO', payload: { completedTodo: data } });
    } catch (error) {
      console.error('Ошибка при обновлении задачи', error);
    }
  };

export const deleteTodo = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(`http://localhost:5001/posts/${id}`, {
      method: 'DELETE',
    });
    const data = (await response.json()) as Todo;

    dispatch({ type: 'DELETE_TODO', payload: { deletedTodo: data } });
  } catch (error) {
    console.error('Ошибка при удалении задачи', error);
  }
};
