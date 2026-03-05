'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getTokenPayload, getUserRole } from '@/app/lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  redirectTo = '/galeria',
}) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const payload = getTokenPayload();

    if (!payload) {
      router.replace('/auth/login');
      setAuthorized(false);
      return;
    }

    if (allowedRoles) {
      const role = getUserRole();
      if (!allowedRoles.includes(role)) {
        router.replace(redirectTo);
        setAuthorized(false);
        return;
      }
    }

    setAuthorized(true);
  }, []);

  if (authorized === null || authorized === false) return null;

  return <>{children}</>;
};
