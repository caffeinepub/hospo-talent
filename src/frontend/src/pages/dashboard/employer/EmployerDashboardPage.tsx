import { useSEO } from '../../../lib/seo';
import { Link } from '@tanstack/react-router';
import RequireAuth from '../../../components/auth/RequireAuth';
import RequireAppRole from '../../../components/auth/RequireAppRole';
import { Button } from '../../../components/ui/button';
import { Building, Briefcase, Users } from 'lucide-react';

export default function EmployerDashboardPage() {
  useSEO({
    title: 'Employer Dashboard',
    description: 'Manage your jobs and applications.',
  });

  return (
    <RequireAuth>
      <RequireAppRole allowedRoles={['employer']}>
        <div className="section-padding">
          <div className="container-custom max-w-4xl">
            <h1 className="font-heading text-4xl font-bold mb-8">
              Employer <span className="text-emphasis">Dashboard</span>
            </h1>

            <div className="grid md:grid-cols-3 gap-6">
              <Link to="/dashboard/employer/company">
                <div className="bg-card border border-border-100 rounded-card p-6 premium-shadow hover:shadow-premium-lg transition-all cursor-pointer h-full">
                  <Building className="w-10 h-10 text-primary-purple mb-3" />
                  <h3 className="font-heading text-xl font-semibold mb-2">Company Profile</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage your company information
                  </p>
                  <Button variant="outline" size="sm" className="w-full">Edit Profile</Button>
                </div>
              </Link>

              <Link to="/dashboard/employer/jobs">
                <div className="bg-card border border-border-100 rounded-card p-6 premium-shadow hover:shadow-premium-lg transition-all cursor-pointer h-full">
                  <Briefcase className="w-10 h-10 text-primary-purple mb-3" />
                  <h3 className="font-heading text-xl font-semibold mb-2">My Jobs</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    View and manage your job postings
                  </p>
                  <Button variant="outline" size="sm" className="w-full">View Jobs</Button>
                </div>
              </Link>

              <Link to="/dashboard/employer/applications">
                <div className="bg-card border border-border-100 rounded-card p-6 premium-shadow hover:shadow-premium-lg transition-all cursor-pointer h-full">
                  <Users className="w-10 h-10 text-primary-purple mb-3" />
                  <h3 className="font-heading text-xl font-semibold mb-2">Applications</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Review candidate applications
                  </p>
                  <Button variant="outline" size="sm" className="w-full">View Applications</Button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </RequireAppRole>
    </RequireAuth>
  );
}
