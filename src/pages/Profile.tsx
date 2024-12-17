import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store';
import { updateUser } from '../store/user/thunks';

export function Profile() {
  const user = useAppSelector(state => state.user.user);
  const userError = useAppSelector(state => state.user.error);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData) as {
      email: string;
      password?: string;
      confirmPassword?: string;
    };

    if (!values.email) {
      setError('Введите email');
      return;
    }

    if (values.password !== values.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    dispatch(
      updateUser({
        id: user.id,
        newEmail: values.email,
        newPassword: values.password,
      })
    );
    setMessage('Успешно сохранено!');
    setError('');
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">Обновить профиль</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={user.email}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Новый пароль
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Повторить пароль
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>

          {!userError && !error && message ? (
            <p className="pb-2 text-green-600">{message}</p>
          ) : null}
          {userError || error ? <p className="pb-2 text-red-600">{userError || error}</p> : null}

          <button
            type="submit"
            className="mt-2.5 w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Сохранить
          </button>
        </form>

        <Link
          to="/"
          className="mt-2.5 block w-full rounded-lg bg-gray-500 px-4 py-2.5 text-center font-semibold text-white shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}
