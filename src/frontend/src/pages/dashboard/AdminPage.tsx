import { useSEO } from '../../lib/seo';
import RequireAuth from '../../components/auth/RequireAuth';
import RequireAppRole from '../../components/auth/RequireAppRole';

export default function AdminPage() {
  useSEO({
    title: 'Admin Dashboard',
    description: 'Admin dashboard for HOSPO TALENT.',
  });

  return (
    <RequireAuth>
      <RequireAppRole allowedRoles={['admin']}>
        <div className="section-padding">
          <div className="container-custom max-w-4xl">
            <h1 className="font-heading text-4xl font-bold mb-8">
              Admin <span className="text-emphasis">Dashboard</span>
            </h1>
            <div className="bg-card border border-border-100 rounded-card p-8">
              <p className="text-muted-foreground">
                Admin metrics and moderation tools coming soon.
              </p>
            </div>
          </div>
        </div>
      </RequireAppRole>
    </RequireAuth>
  );
}
