import { useState } from 'react';
import { useSEO } from '../../lib/seo';
import { useListFilteredJobs } from '../../hooks/useQueries';
import { Link } from '@tanstack/react-router';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { JobCardSkeleton } from '../../components/states/LoadingSkeleton';
import EmptyState from '../../components/states/EmptyState';
import InlineAlert from '../../components/states/InlineAlert';
import { Briefcase, MapPin, Clock } from 'lucide-react';
import { JobStatus } from '../../backend';
import { formatSalary } from '../../lib/utils';
import { normalizeError } from '../../lib/errors';

export default function JobsListPage() {
  useSEO({
    title: 'Browse Jobs',
    description: 'Browse hospitality job opportunities across the UK.',
  });

  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const filters = {
    keyword: keyword || undefined,
    location: location || undefined,
    status: JobStatus.published,
  };

  const { data: jobs, isLoading, error } = useListFilteredJobs(filters);

  return (
    <div className="section-padding">
      <div className="container-custom">
        <h1 className="font-heading text-5xl font-bold mb-6">
          Browse <span className="text-emphasis">Jobs</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Discover your next hospitality opportunity
        </p>

        {/* Filters */}
        <div className="bg-card border border-border-100 rounded-card p-6 mb-8 premium-shadow">
          <div className="grid md:grid-cols-3 gap-4">
            <Input
              placeholder="Search by keyword..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Input
              placeholder="Location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button
              onClick={() => {
                setKeyword('');
                setLocation('');
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Error State */}
        {error && <InlineAlert variant="destructive" message={normalizeError(error)} />}

        {/* Loading State */}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && jobs && jobs.length === 0 && (
          <EmptyState
            icon={Briefcase}
            title="No jobs found"
            description="Try adjusting your search filters to find more opportunities."
          />
        )}

        {/* Jobs Grid */}
        {!isLoading && !error && jobs && jobs.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <Link key={job.id.toString()} to="/jobs/$slug" params={{ slug: job.slug }}>
                <div className="bg-card border border-border-100 rounded-card p-6 premium-shadow hover:shadow-premium-lg transition-all h-full cursor-pointer">
                  <h3 className="font-heading text-xl font-semibold mb-3">{job.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {Object.keys(job.jobType)[0]}
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-primary-purple mb-4">
                    {formatSalary(job.salary)}
                  </p>
                  <Button className="w-full" variant="outline">
                    View Job
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
