import { CheckIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { cn } from './utils/cn';
import { useState } from 'react';
import { type Todo } from './models';

export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTodo.trim()) return;

    const newTodoItem: Todo = {
      id: Date.now(),
      text: newTodo,
      isCompleted: false,
    };

    setTodos(prev => [newTodoItem, ...prev]);
    setNewTodo('');
  };

  const handleComplete = (id: number) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo))
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">Лист задач</h1>
        <form onSubmit={handleAdd} className="mb-4 flex items-center">
          <input
            type="text"
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            placeholder="Добавить задачу"
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="ml-2 rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        </form>

        <ul className="space-y-3">
          {todos.map(todo => (
            <li
              key={todo.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm"
            >
              <span
                className={`flex-1 ${
                  todo.isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'
                }`}
              >
                {todo.text}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleComplete(todo.id)}
                  className={cn(
                    'rounded-full p-2 text-white focus:outline-none focus:ring',
                    !todo.isCompleted
                      ? 'bg-green-500 hover:bg-green-600 focus:ring-green-300'
                      : 'bg-green-300 hover:bg-green-400 focus:ring-green-200'
                  )}
                >
                  <CheckIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="rounded-full bg-red-500 p-2 text-white hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {!todos.length ? (
          <p className="mt-4 text-center text-gray-500">В задачах пусто. Добавьте одну!</p>
        ) : null}
      </div>
    </div>
  );
}
