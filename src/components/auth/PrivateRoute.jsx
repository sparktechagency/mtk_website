'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import useAuthStore from '@/store/auth';
import { useGetMe } from '@/hooks/useGetMe';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  const { user, isUserPending, isUserFetching, isUserLoading, isUserError } = useGetMe();

  useEffect(() => {
    if (!token) {
      toast.error('You need to be logged in to access this page.');
      router.push('/auth/login');
    }
  }, [token, router]);

  if (isUserPending || isUserFetching || isUserLoading) {
    return <div>Loading user data...</div>;
  }

  if (isUserError || !user) {
    toast.error('Your session has expired or is invalid. Please log in again.');
    router.push('/auth/login');
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;