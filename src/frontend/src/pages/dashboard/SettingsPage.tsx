import { useSEO } from '../../lib/seo';
import RequireAuth from '../../components/auth/RequireAuth';

export default function SettingsPage() {
  useSEO({
    title: 'Settings',
    description: 'Manage your account settings.',
  });

  return (
    <RequireAuth>
      <div className="section-padding">
        <div className="container-custom max-w-3xl">
          <h1 className="font-heading text-4xl font-bold mb-8">
            <span className="text-emphasis">Settings</span>
          </h1>
          <div className="bg-card border border-border-100 rounded-card p-8">
            <p className="text-muted-foreground">Settings functionality coming soon.</p>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}
