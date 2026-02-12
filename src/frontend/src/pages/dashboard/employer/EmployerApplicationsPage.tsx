import { useSEO } from '../../../lib/seo';
import { useListFilteredJobs, useListJobApplications, useUpdateApplicationStatus } from '../../../hooks/useQueries';
import RequireAuth from '../../../components/auth/RequireAuth';
import RequireAppRole from '../../../components/auth/RequireAppRole';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { ApplicationCardSkeleton } from '../../../components/states/LoadingSkeleton';
import EmptyState from '../../../components/states/EmptyState';
import { Users } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';
import { formatDate } from '../../../lib/utils';
import { ApplicationStatusType } from '../../../backend';
import { toast } from 'sonner';
import { normalizeError } from '../../../lib/errors';
import { useState } from 'react';

export default function EmployerApplicationsPage() {
  useSEO({
    title: 'Applications',
    description: 'Manage candidate applications.',
  });

  const { data: jobs } = useListFilteredJobs({});
  const [selectedJobId, setSelectedJobId] = useState<bigint | null>(null);
  const { data: applications, isLoading } = useListJobApplications(selectedJobId);
  const updateStatusMutation = useUpdateApplicationStatus();

  const handleStatusChange = async (applicationId: bigint, newStatus: keyof typeof ApplicationStatusType) => {
    try {
      await updateStatusMutation.mutateAsync({
        applicationId,
        status: ApplicationStatusType[newStatus],
      });
      toast.success('Application status updated');
    } catch (error) {
      toast.error(normalizeError(error));
    }
  };

  return (
    <RequireAuth>
      <RequireAppRole allowedRoles={['employer']}>
        <div className="section-padding">
          <div className="container-custom max-w-4xl">
            <h1 className="font-heading text-4xl font-bold mb-8">
              <span className="text-emphasis">Applications</span>
            </h1>

            {jobs && jobs.length > 0 && (
              <div className="mb-8">
                <label className="block text-sm font-medium mb-2">Select a job to view applications:</label>
                <Select
                  value={selectedJobId?.toString() || ''}
                  onValueChange={(value) => setSelectedJobId(value ? BigInt(value) : null)}
                >
                  <SelectTrigger className="w-full md:w-96">
                    <SelectValue placeholder="Choose a job..." />
                  </SelectTrigger>
                  <SelectContent>
                    {jobs.map((job) => (
                      <SelectItem key={job.id.toString()} value={job.id.toString()}>
                        {job.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {!selectedJobId && (
              <EmptyState
                icon={Users}
                title="Select a job"
                description="Choose a job from the dropdown above to view its applications."
              />
            )}

            {selectedJobId && isLoading && (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <ApplicationCardSkeleton key={i} />
                ))}
              </div>
            )}

            {selectedJobId && !isLoading && applications && applications.length === 0 && (
              <EmptyState
                icon={Users}
                title="No applications yet"
                description="This job hasn't received any applications yet."
              />
            )}

            {selectedJobId && !isLoading && applications && applications.length > 0 && (
              <div className="space-y-4">
                {applications.map((app) => (
                  <div key={app.id.toString()} className="bg-card border border-border-100 rounded-card p-6 premium-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-heading text-lg font-semibold mb-1">
                          Candidate ID: {app.candidateId.toString().substring(0, 10)}...
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Applied on {formatDate(app.appliedAt)}
                        </p>
                      </div>
                      <Badge>{Object.keys(app.status)[0]}</Badge>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">Update Status:</label>
                      <Select
                        value={Object.keys(app.status)[0]}
                        onValueChange={(value) => handleStatusChange(app.id, value as keyof typeof ApplicationStatusType)}
                        disabled={updateStatusMutation.isPending}
                      >
                        <SelectTrigger className="w-full md:w-64">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="applied">Applied</SelectItem>
                          <SelectItem value="shortlisted">Shortlisted</SelectItem>
                          <SelectItem value="interview">Interview</SelectItem>
                          <SelectItem value="hired">Hired</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
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
