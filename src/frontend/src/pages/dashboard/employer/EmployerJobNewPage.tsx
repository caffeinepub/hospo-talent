import { useState } from 'react';
import { useSEO } from '../../../lib/seo';
import { useSaveJob } from '../../../hooks/useQueries';
import { useNavigate } from '@tanstack/react-router';
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

export default function EmployerJobNewPage() {
  useSEO({
    title: 'Post New Job',
    description: 'Create a new job posting.',
  });

  const navigate = useNavigate();
  const saveMutation = useSaveJob();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [jobType, setJobType] = useState<keyof typeof JobType>('fullTime');
  const [status, setStatus] = useState<keyof typeof JobStatus>('draft');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    try {
      await saveMutation.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        salary: BigInt(salary),
        jobType: JobType[jobType],
        status: JobStatus[status],
        slug,
      });
      toast.success('Job posted successfully!');
      navigate({ to: '/dashboard/employer/jobs' });
    } catch (error) {
      toast.error(normalizeError(error));
    }
  };

  return (
    <RequireAuth>
      <RequireAppRole allowedRoles={['employer']}>
        <div className="section-padding">
          <div className="container-custom max-w-3xl">
            <h1 className="font-heading text-4xl font-bold mb-8">
              Post New <span className="text-emphasis">Job</span>
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Head Chef"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., London, UK"
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
                    placeholder="e.g., 35000"
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
                  placeholder="Describe the role, responsibilities, and requirements..."
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
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Draft jobs are only visible to you. Published jobs are visible to all candidates.
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="flex-1 bg-light-lavender hover:bg-soft-accent text-ink-900 font-semibold"
                >
                  {saveMutation.isPending ? 'Posting...' : 'Post Job'}
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
