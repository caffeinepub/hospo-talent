import { useSEO } from '../../lib/seo';
import { Link } from '@tanstack/react-router';
import { Button } from '../../components/ui/button';
import { Briefcase, Search, UserCheck, TrendingUp } from 'lucide-react';

export default function EmployersPage() {
  useSEO({
    title: 'For Employers',
    description: 'Find exceptional hospitality talent for your business with HOSPO TALENT.',
  });

  return (
    <div>
      {/* Hero */}
      <section className="section-padding bg-ink-900 text-white">
        <div className="container-custom text-center">
          <h1 className="font-heading text-5xl font-bold mb-6">
            Find Your Next <span className="text-emphasis">Star</span> Employee
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Access a pool of qualified, passionate hospitality professionals ready to join your team
          </p>
          <Link to="/dashboard/employer/jobs/new">
            <Button className="bg-light-lavender hover:bg-soft-accent text-ink-900 font-semibold rounded-pill px-8 py-6 text-lg transition-all duration-300 hover:shadow-lg hover:scale-105">
              Post a Job
            </Button>
          </Link>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="font-heading text-4xl font-bold text-center mb-12">
            How It <span className="text-emphasis">Works</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-light-lavender rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-ink-900" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">1. Post Your Job</h3>
              <p className="text-muted-foreground">Create a detailed job listing in minutes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-light-lavender rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-ink-900" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">2. Review Applications</h3>
              <p className="text-muted-foreground">Browse qualified candidates who apply</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-light-lavender rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-8 h-8 text-ink-900" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">3. Interview & Hire</h3>
              <p className="text-muted-foreground">Connect with top talent and make your hire</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-light-lavender rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-ink-900" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">4. Grow Your Team</h3>
              <p className="text-muted-foreground">Build a stronger hospitality business</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-surface-50">
        <div className="container-custom text-center">
          <h2 className="font-heading text-4xl font-bold mb-6">
            Ready to Find Your Next <span className="text-emphasis">Team Member</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join hundreds of UK hospitality businesses hiring through HOSPO TALENT
          </p>
          <Link to="/dashboard/employer/jobs/new">
            <Button className="bg-light-lavender hover:bg-soft-accent text-ink-900 font-semibold rounded-pill px-8 py-6 text-lg transition-all duration-300 hover:shadow-lg hover:scale-105">
              Post Your First Job
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
