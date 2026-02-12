import { useSEO } from '../../lib/seo';
import { Link } from '@tanstack/react-router';
import { Button } from '../../components/ui/button';
import { Briefcase, Users, Award, TrendingUp } from 'lucide-react';

export default function HomePage() {
  useSEO({
    title: 'Home',
    description: 'HOSPO TALENT - Connecting hospitality talent across the UK with premium opportunities.',
    ogTitle: 'HOSPO TALENT - UK Hospitality Recruitment',
    ogDescription: 'Find your next hospitality role or hire top talent in the UK hospitality sector.',
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-ink-900 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="font-heading text-5xl md:text-6xl font-extrabold mb-6">
              Find Your Perfect <span className="text-emphasis">Hospitality</span> Match
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Connecting the UK's finest hospitality talent with exceptional opportunities
            </p>
          </div>

          {/* Glass CTAs */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <Link to="/candidates">
              <div className="glass-card rounded-card p-8 premium-shadow-lg text-center cursor-pointer h-full transition-all duration-300 hover:scale-105">
                <Users className="w-16 h-16 mx-auto mb-4 text-light-lavender" />
                <h3 className="font-heading text-2xl font-bold mb-3">Job Seekers</h3>
                <p className="text-gray-300 mb-6">
                  Discover your next career opportunity in hospitality
                </p>
                <Button className="w-full bg-light-lavender hover:bg-soft-accent text-ink-900 font-semibold rounded-pill px-8 py-6 text-lg transition-all duration-300 hover:shadow-lg">
                  Browse Jobs
                </Button>
              </div>
            </Link>

            <Link to="/employers">
              <div className="glass-card rounded-card p-8 premium-shadow-lg text-center cursor-pointer h-full transition-all duration-300 hover:scale-105">
                <Briefcase className="w-16 h-16 mx-auto mb-4 text-light-lavender" />
                <h3 className="font-heading text-2xl font-bold mb-3">Staff Seekers</h3>
                <p className="text-gray-300 mb-6">
                  Find exceptional talent for your hospitality business
                </p>
                <Button className="w-full bg-light-lavender hover:bg-soft-accent text-ink-900 font-semibold rounded-pill px-8 py-6 text-lg transition-all duration-300 hover:shadow-lg">
                  Post a Job
                </Button>
              </div>
            </Link>
          </div>

          {/* UK Map Placeholder */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/5 rounded-card p-12 text-center">
              <p className="text-gray-400 text-sm mb-2">Connecting talent across the UK</p>
              <div className="h-64 flex items-center justify-center">
                <div className="text-6xl opacity-20">🇬🇧</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With HOSPO */}
      <section className="section-padding bg-surface-50">
        <div className="container-custom">
          <h2 className="font-heading text-4xl font-bold text-center mb-12">
            Why Work With <span className="text-emphasis">HOSPO</span>?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Award className="w-12 h-12 mx-auto mb-4 text-primary-purple" />
              <h3 className="font-heading text-xl font-semibold mb-3">Premium Opportunities</h3>
              <p className="text-muted-foreground">
                Access exclusive roles at the UK's top hospitality venues
              </p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-primary-purple" />
              <h3 className="font-heading text-xl font-semibold mb-3">Career Growth</h3>
              <p className="text-muted-foreground">
                Advance your career with tailored opportunities and support
              </p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-primary-purple" />
              <h3 className="font-heading text-xl font-semibold mb-3">UK-First Focus</h3>
              <p className="text-muted-foreground">
                Dedicated to connecting talent across the United Kingdom
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h2 className="font-heading text-4xl font-bold mb-6">
            Ready to Get <span className="text-emphasis">Started</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of hospitality professionals finding their perfect match
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
