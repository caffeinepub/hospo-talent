import { useSEO } from '../../lib/seo';
import { useGetJobBySlug, useApplyForJob } from '../../hooks/useQueries';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../../hooks/useQueries';
import { Button } from '../../components/ui/button';
import { JobDetailSkeleton } from '../../components/states/LoadingSkeleton';
import InlineAlert from '../../components/states/InlineAlert';
import { MapPin, Clock, Briefcase, DollarSign } from 'lucide-react';
import { formatSalary, formatDate } from '../../lib/utils';
import { normalizeError } from '../../lib/errors';
import { toast } from 'sonner';

export default function JobDetailPage() {
  const { slug } = useParams({ from: '/jobs/$slug' });
  const navigate = useNavigate();
  const { identity, login } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const { data: job, isLoading, error } = useGetJobBySlug(slug);
  const applyMutation = useApplyForJob();

  useSEO({
    title: job?.title || 'Job Details',
    description: job?.description.substring(0, 160) || 'View job details',
  });

  const handleApply = async () => {
    if (!identity) {
      login();
      return;
    }

    if (!userProfile) {
      toast.error('Please complete your profile setup first');
      return;
    }

    const userRoleKey = Object.keys(userProfile.appRole)[0];
    if (userRoleKey !== 'candidate') {
      toast.error('Only candidates can apply for jobs');
      return;
    }

    if (!job) return;

    try {
      await applyMutation.mutateAsync(job.id);
      toast.success('Application submitted successfully!');
      navigate({ to: '/dashboard/candidate/applications' });
    } catch (err) {
      toast.error(normalizeError(err));
    }
  };

  if (isLoading) {
    return (
      <div className="section-padding">
        <div className="container-custom max-w-4xl">
          <JobDetailSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section-padding">
        <div className="container-custom max-w-4xl">
          <InlineAlert variant="destructive" message={normalizeError(error)} />
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="section-padding">
        <div className="container-custom max-w-4xl">
          <InlineAlert variant="destructive" title="Job Not Found" message="This job posting could not be found or is no longer available." />
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-custom max-w-4xl">
        <div className="bg-card border border-border-100 rounded-card p-8 premium-shadow">
          <h1 className="font-heading text-4xl font-bold mb-6">{job.title}</h1>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-5 h-5" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-5 h-5" />
              <span>{Object.keys(job.jobType)[0]}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="w-5 h-5" />
              <span>{formatSalary(job.salary)}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Briefcase className="w-5 h-5" />
              <span>Posted {formatDate(job.created)}</span>
            </div>
          </div>

          <div className="border-t border-border-100 pt-6 mb-6">
            <h2 className="font-heading text-2xl font-semibold mb-4">Job Description</h2>
            <div className="prose max-w-none text-muted-foreground whitespace-pre-wrap">
              {job.description}
            </div>
          </div>

          <Button
            onClick={handleApply}
            disabled={applyMutation.isPending}
            className="w-full md:w-auto bg-light-lavender hover:bg-soft-accent text-ink-900 font-semibold px-8 py-6 text-lg"
          >
            {applyMutation.isPending ? 'Applying...' : identity ? 'Apply Now' : 'Log In to Apply'}
          </Button>
        </div>
      </div>
    </div>
  );
}
