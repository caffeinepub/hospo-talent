import { useSEO } from '../../lib/seo';
import { Link } from '@tanstack/react-router';
import { Button } from '../../components/ui/button';
import { Search, FileText, Send, Briefcase } from 'lucide-react';

export default function CandidatesPage() {
  useSEO({
    title: 'For Candidates',
    description: 'Find your next hospitality career opportunity with HOSPO TALENT.',
  });

  return (
    <div>
      {/* Hero */}
      <section className="section-padding bg-ink-900 text-white">
        <div className="container-custom text-center">
          <h1 className="font-heading text-5xl font-bold mb-6">
            Your Next <span className="text-emphasis">Opportunity</span> Awaits
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover exciting hospitality roles across the UK and take the next step in your career
          </p>
          <Link to="/jobs">
            <Button className="bg-light-lavender hover:bg-soft-accent text-ink-900 font-semibold rounded-pill px-8 py-6 text-lg transition-all duration-300 hover:shadow-lg hover:scale-105">
              Browse Jobs
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
                <Search className="w-8 h-8 text-ink-900" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">1. Browse Jobs</h3>
              <p className="text-muted-foreground">Explore opportunities that match your skills</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-light-lavender rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-ink-900" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">2. Create Profile</h3>
              <p className="text-muted-foreground">Build your profile and upload your CV</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-light-lavender rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-ink-900" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">3. Apply</h3>
              <p className="text-muted-foreground">Submit your application with one click</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-light-lavender rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-ink-900" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">4. Get Hired</h3>
              <p className="text-muted-foreground">Connect with employers and land your dream role</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-surface-50">
        <div className="container-custom text-center">
          <h2 className="font-heading text-4xl font-bold mb-6">
            Start Your <span className="text-emphasis">Journey</span> Today
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of hospitality professionals finding their perfect role
          </p>
          <Link to="/jobs">
            <Button className="bg-light-lavender hover:bg-soft-accent text-ink-900 font-semibold rounded-pill px-8 py-6 text-lg transition-all duration-300 hover:shadow-lg hover:scale-105">
              Explore Opportunities
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
