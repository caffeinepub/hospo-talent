import { useSEO } from '../../../lib/seo';
import { useListFilteredJobs, useDeleteJob } from '../../../hooks/useQueries';
import { Link } from '@tanstack/react-router';
import RequireAuth from '../../../components/auth/RequireAuth';
import RequireAppRole from '../../../components/auth/RequireAppRole';
import { Button } from '../../../components/ui/button';
import { JobCardSkeleton } from '../../../components/states/LoadingSkeleton';
import EmptyState from '../../../components/states/EmptyState';
import InlineAlert from '../../../components/states/InlineAlert';
import { Briefcase, Edit, Trash2 } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';
import { formatSalary } from '../../../lib/utils';
import { normalizeError } from '../../../lib/errors';
import { toast } from 'sonner';

export default function EmployerJobsPage() {
  useSEO({
    title: 'My Jobs',
    description: 'Manage your job postings.',
  });

  const { data: jobs, isLoading, error } = useListFilteredJobs({});
  const deleteMutation = useDeleteJob();

  const handleDelete = async (jobId: bigint, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await deleteMutation.mutateAsync(jobId);
      toast.success('Job deleted successfully');
    } catch (err) {
      toast.error(normalizeError(err));
    }
  };

  return (
    <RequireAuth>
      <RequireAppRole allowedRoles={['employer']}>
        <div className="section-padding">
          <div className="container-custom max-w-4xl">
            <div className="flex justify-between items-center mb-8">
              <h1 className="font-heading text-4xl font-bold">
                My <span className="text-emphasis">Jobs</span>
              </h1>
              <Link to="/dashboard/employer/jobs/new">
                <Button className="bg-light-lavender hover:bg-soft-accent text-ink-900 font-semibold">
                  Post New Job
                </Button>
              </Link>
            </div>

            {error && <InlineAlert variant="destructive" message={normalizeError(error)} />}

            {isLoading && (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <JobCardSkeleton key={i} />
                ))}
              </div>
            )}

            {!isLoading && !error && jobs && jobs.length === 0 && (
              <EmptyState
                icon={Briefcase}
                title="No jobs posted yet"
                description="Create your first job posting to start receiving applications."
                action={{
                  label: 'Post a Job',
                  onClick: () => {},
                }}
              />
            )}

            {!isLoading && !error && jobs && jobs.length > 0 && (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div key={job.id.toString()} className="bg-card border border-border-100 rounded-card p-6 premium-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-heading text-xl font-semibold mb-2">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.location} • {formatSalary(job.salary)}</p>
                      </div>
                      <Badge>{Object.keys(job.status)[0]}</Badge>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Link to="/dashboard/employer/jobs/$id/edit" params={{ id: job.id.toString() }}>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(job.id, job.title)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
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
