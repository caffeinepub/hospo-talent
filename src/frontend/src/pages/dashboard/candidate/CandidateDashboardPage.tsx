import { useSEO } from '../../../lib/seo';
import { Link } from '@tanstack/react-router';
import RequireAuth from '../../../components/auth/RequireAuth';
import RequireAppRole from '../../../components/auth/RequireAppRole';
import { Button } from '../../../components/ui/button';
import { FileText, Briefcase } from 'lucide-react';

export default function CandidateDashboardPage() {
  useSEO({
    title: 'Candidate Dashboard',
    description: 'Manage your job applications and profile.',
  });

  return (
    <RequireAuth>
      <RequireAppRole allowedRoles={['candidate']}>
        <div className="section-padding">
          <div className="container-custom max-w-4xl">
            <h1 className="font-heading text-4xl font-bold mb-8">
              Candidate <span className="text-emphasis">Dashboard</span>
            </h1>

            <div className="grid md:grid-cols-2 gap-6">
              <Link to="/dashboard/candidate/profile">
                <div className="bg-card border border-border-100 rounded-card p-8 premium-shadow hover:shadow-premium-lg transition-all cursor-pointer h-full">
                  <FileText className="w-12 h-12 text-primary-purple mb-4" />
                  <h3 className="font-heading text-2xl font-semibold mb-2">My Profile</h3>
                  <p className="text-muted-foreground mb-4">
                    Update your profile information and upload your CV
                  </p>
                  <Button variant="outline" className="w-full">Manage Profile</Button>
                </div>
              </Link>

              <Link to="/dashboard/candidate/applications">
                <div className="bg-card border border-border-100 rounded-card p-8 premium-shadow hover:shadow-premium-lg transition-all cursor-pointer h-full">
                  <Briefcase className="w-12 h-12 text-primary-purple mb-4" />
                  <h3 className="font-heading text-2xl font-semibold mb-2">My Applications</h3>
                  <p className="text-muted-foreground mb-4">
                    Track the status of your job applications
                  </p>
                  <Button variant="outline" className="w-full">View Applications</Button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </RequireAppRole>
    </RequireAuth>
  );
}
