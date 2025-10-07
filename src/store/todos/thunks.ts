import { v4 as uuidv4 } from 'uuid';

import { type AppDispatch } from '..';

export const readTodos = () => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch('http://localhost:5001/posts');
    const data = await response.json();

    dispatch({ type: 'SET_TODOS', todos: data });
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
    const data = await response.json();

    dispatch({ type: 'ADD_TODO', todo: data });
  } catch (error) {
    console.error('Ошибка при добавлении задачи', error);
  }
};

export const completeTodo = (id: string, isCompleted: boolean) => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(`http://localhost:5001/posts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ isCompleted: !isCompleted }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    dispatch({ type: 'COMPLETE_TODO', todo: data });
  } catch (error) {
    console.error('Ошибка при обновлении задачи', error);
  }
};

export const deleteTodo = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(`http://localhost:5001/posts/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();

    dispatch({ type: 'DELETE_TODO', todo: data });
  } catch (error) {
    console.error('Ошибка при удалении задачи', error);
  }
};
