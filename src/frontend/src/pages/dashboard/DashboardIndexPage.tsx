import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGetCallerUserProfile } from '../../hooks/useQueries';
import RequireAuth from '../../components/auth/RequireAuth';

export default function DashboardIndexPage() {
  const navigate = useNavigate();
  const { data: userProfile, isLoading } = useGetCallerUserProfile();

  useEffect(() => {
    if (!isLoading && userProfile) {
      const roleKey = Object.keys(userProfile.appRole)[0];
      if (roleKey === 'candidate') {
        navigate({ to: '/dashboard/candidate' });
      } else if (roleKey === 'employer') {
        navigate({ to: '/dashboard/employer' });
      } else if (roleKey === 'admin') {
        navigate({ to: '/dashboard/admin' });
      }
    }
  }, [userProfile, isLoading, navigate]);

  return (
    <RequireAuth>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-purple mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting to your dashboard...</p>
        </div>
      </div>
    </RequireAuth>
  );
}
