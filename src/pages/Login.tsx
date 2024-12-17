import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store';
import { login } from '../store/user/thunks';

export function Login() {
  const user = useAppSelector(state => state.user.user);
  const userError = useAppSelector(state => state.user.error);

  const [error, setError] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData) as { email: string; password: string };

    if (!values.email) {
      setError('Введите email');
      return;
    }

    if (!values.password) {
      setError('Введите пароль');
      return;
    }

    await dispatch(login(values)).unwrap();
    setError('');
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="text-center text-2xl font-bold text-gray-800">Авторизация</h1>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>

          {userError || error ? <p className="text-red-600">{userError || error}</p> : null}

          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Войти
          </button>
          {user ? (
            <Link
              to="/"
              className="mt-2 block w-full rounded-lg bg-gray-500 px-4 py-3 text-center font-semibold text-white shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              На главную
            </Link>
          ) : null}
        </form>
      </div>
    </div>
  );
}
