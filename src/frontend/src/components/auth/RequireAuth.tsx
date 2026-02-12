import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../../hooks/useQueries';
import { AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from '@tanstack/react-router';

interface RequireAuthProps {
  children: React.ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const { data: userProfile, isLoading } = useGetCallerUserProfile();
  const navigate = useNavigate();

  if (!identity) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-16 h-16 text-primary-purple mx-auto mb-4" />
          <h2 className="font-heading text-2xl font-bold mb-2">Authentication Required</h2>
          <p className="text-muted-foreground mb-6">
            You need to be logged in to access this page.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => login()}
              disabled={isLoggingIn}
              className="bg-light-lavender hover:bg-soft-accent text-ink-900 font-semibold"
            >
              {isLoggingIn ? 'Logging in...' : 'Log In'}
            </Button>
            <Button
              onClick={() => navigate({ to: '/' })}
              variant="outline"
            >
              Go Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
          <h2 className="font-heading text-2xl font-bold mb-2">Profile Setup Required</h2>
          <p className="text-muted-foreground mb-6">
            Please complete your profile setup to continue.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
