import { useSEO } from '../../../lib/seo';
import { useListCandidateApplications, useListFilteredJobs } from '../../../hooks/useQueries';
import RequireAuth from '../../../components/auth/RequireAuth';
import RequireAppRole from '../../../components/auth/RequireAppRole';
import { ApplicationCardSkeleton } from '../../../components/states/LoadingSkeleton';
import EmptyState from '../../../components/states/EmptyState';
import InlineAlert from '../../../components/states/InlineAlert';
import { Briefcase } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';
import { formatDate } from '../../../lib/utils';
import { normalizeError } from '../../../lib/errors';
import { JobStatus } from '../../../backend';

export default function CandidateApplicationsPage() {
  useSEO({
    title: 'My Applications',
    description: 'Track your job applications.',
  });

  const { data: applications, isLoading, error } = useListCandidateApplications();
  const { data: jobs } = useListFilteredJobs({ status: JobStatus.published });

  const getJobTitle = (jobId: bigint) => {
    const job = jobs?.find(j => j.id === jobId);
    return job?.title || 'Unknown Job';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hired': return 'bg-green-100 text-green-800';
      case 'interview': return 'bg-blue-100 text-blue-800';
      case 'shortlisted': return 'bg-purple-100 text-purple-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <RequireAuth>
      <RequireAppRole allowedRoles={['candidate']}>
        <div className="section-padding">
          <div className="container-custom max-w-4xl">
            <h1 className="font-heading text-4xl font-bold mb-8">
              My <span className="text-emphasis">Applications</span>
            </h1>

            {error && <InlineAlert variant="destructive" message={normalizeError(error)} />}

            {isLoading && (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <ApplicationCardSkeleton key={i} />
                ))}
              </div>
            )}

            {!isLoading && !error && applications && applications.length === 0 && (
              <EmptyState
                icon={Briefcase}
                title="No applications yet"
                description="Start applying for jobs to see your applications here."
              />
            )}

            {!isLoading && !error && applications && applications.length > 0 && (
              <div className="space-y-4">
                {applications.map((app) => (
                  <div key={app.id.toString()} className="bg-card border border-border-100 rounded-card p-6 premium-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-heading text-xl font-semibold">{getJobTitle(app.jobId)}</h3>
                      <Badge className={getStatusColor(Object.keys(app.status)[0])}>
                        {Object.keys(app.status)[0]}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Applied on {formatDate(app.appliedAt)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </RequireAppRole>
    </RequireAuth>
  );
}
