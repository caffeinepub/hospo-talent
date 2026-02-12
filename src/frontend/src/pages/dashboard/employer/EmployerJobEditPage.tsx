import { useState, useEffect } from 'react';
import { useSEO } from '../../../lib/seo';
import { useGetJob, useUpdateJob } from '../../../hooks/useQueries';
import { useParams, useNavigate } from '@tanstack/react-router';
import RequireAuth from '../../../components/auth/RequireAuth';
import RequireAppRole from '../../../components/auth/RequireAppRole';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { JobStatus, JobType } from '../../../backend';
import { toast } from 'sonner';
import { normalizeError } from '../../../lib/errors';

export default function EmployerJobEditPage() {
  useSEO({
    title: 'Edit Job',
    description: 'Edit your job posting.',
  });

  const { id } = useParams({ from: '/dashboard/employer/jobs/$id/edit' });
  const navigate = useNavigate();
  const { data: job, isLoading } = useGetJob(BigInt(id));
  const updateMutation = useUpdateJob();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [jobType, setJobType] = useState<keyof typeof JobType>('fullTime');
  const [status, setStatus] = useState<keyof typeof JobStatus>('draft');

  useEffect(() => {
    if (job) {
      setTitle(job.title);
      setDescription(job.description);
      setLocation(job.location);
      setSalary(job.salary.toString());
      setJobType(Object.keys(job.jobType)[0] as keyof typeof JobType);
      setStatus(Object.keys(job.status)[0] as keyof typeof JobStatus);
    }
  }, [job]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!job) return;

    try {
      await updateMutation.mutateAsync({
        jobId: job.id,
        jobInput: {
          title: title.trim(),
          description: description.trim(),
          location: location.trim(),
          salary: BigInt(salary),
          jobType: JobType[jobType],
          status: JobStatus[status],
          slug: job.slug,
        },
      });
      toast.success('Job updated successfully!');
      navigate({ to: '/dashboard/employer/jobs' });
    } catch (error) {
      toast.error(normalizeError(error));
    }
  };

  if (isLoading) {
    return (
      <RequireAuth>
        <RequireAppRole allowedRoles={['employer']}>
          <div className="section-padding">
            <div className="container-custom max-w-3xl text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-purple mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading job...</p>
            </div>
          </div>
        </RequireAppRole>
      </RequireAuth>
    );
  }

  if (!job) {
    return (
      <RequireAuth>
        <RequireAppRole allowedRoles={['employer']}>
          <div className="section-padding">
            <div className="container-custom max-w-3xl">
              <p className="text-center text-muted-foreground">Job not found</p>
            </div>
          </div>
        </RequireAppRole>
      </RequireAuth>
    );
  }

  return (
    <RequireAuth>
      <RequireAppRole allowedRoles={['employer']}>
        <div className="section-padding">
          <div className="container-custom max-w-3xl">
            <h1 className="font-heading text-4xl font-bold mb-8">
              Edit <span className="text-emphasis">Job</span>
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jobType">Job Type</Label>
                  <Select value={jobType} onValueChange={(value) => setJobType(value as keyof typeof JobType)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fullTime">Full Time</SelectItem>
                      <SelectItem value="partTime">Part Time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary">Annual Salary (£)</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={8}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={(value) => setStatus(value as keyof typeof JobStatus)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="flex-1 bg-light-lavender hover:bg-soft-accent text-ink-900 font-semibold"
                >
                  {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate({ to: '/dashboard/employer/jobs' })}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </RequireAppRole>
    </RequireAuth>
  );
}
