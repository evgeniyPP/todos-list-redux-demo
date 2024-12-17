import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { type User } from '../models';
import { useAppSelector } from '../store';

type Props = {
  children: React.ReactNode | ((user: User) => React.ReactNode);
};

export function ProtectedRoute({ children }: Props) {
  const user = useAppSelector(state => state.user.user);

  const navigate = useNavigate();

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

  if (typeof children !== 'function') {
    return children;
  }

  return children(user);
}
