import { useGetCallerUserProfile } from '../../hooks/useQueries';
import { AppRole } from '../../backend';
import { AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from '@tanstack/react-router';

interface RequireAppRoleProps {
  children: React.ReactNode;
  allowedRoles: Array<keyof typeof AppRole>;
}

export default function RequireAppRole({ children, allowedRoles }: RequireAppRoleProps) {
  const { data: userProfile, isLoading } = useGetCallerUserProfile();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-purple mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-16 h-16 text-primary-purple mx-auto mb-4" />
          <h2 className="font-heading text-2xl font-bold mb-2">Profile Required</h2>
          <p className="text-muted-foreground mb-6">
            Please complete your profile setup to continue.
          </p>
        </div>
      </div>
    );
  }

  const userRoleKey = Object.keys(userProfile.appRole)[0] as keyof typeof AppRole;
  const hasAccess = allowedRoles.includes(userRoleKey);

  if (!hasAccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="font-heading text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground mb-6">
            You do not have permission to access this page.
          </p>
          <Button
            onClick={() => navigate({ to: '/dashboard' })}
            className="bg-light-lavender hover:bg-soft-accent text-ink-900 font-semibold"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
