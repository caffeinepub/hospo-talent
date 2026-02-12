import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(window.location.hostname || 'hospo-talent');

  return (
    <footer className="bg-ink-900 text-gray-300 py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading font-bold text-xl text-white mb-4">
              HOSPO <span className="text-light-lavender">TALENT</span>
            </h3>
            <p className="text-sm">
              Connecting hospitality talent across the UK with premium opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-light-lavender transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-light-lavender transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="hover:text-light-lavender transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-light-lavender transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* For Job Seekers */}
          <div>
            <h4 className="font-semibold text-white mb-4">For Job Seekers</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/candidates" className="hover:text-light-lavender transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/dashboard/candidate" className="hover:text-light-lavender transition-colors">
                  My Applications
                </Link>
              </li>
              <li>
                <Link to="/dashboard/candidate/profile" className="hover:text-light-lavender transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="font-semibold text-white mb-4">For Employers</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/employers" className="hover:text-light-lavender transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/dashboard/employer" className="hover:text-light-lavender transition-colors">
                  Manage Jobs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-light-lavender transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {currentYear} HOSPO TALENT. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-4 md:mt-0">
            Built with <Heart size={16} className="text-red-500 fill-red-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-light-lavender hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
