import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import StickyNavbar from './components/layout/StickyNavbar';
import Footer from './components/layout/Footer';
import ProfileSetupModal from './components/auth/ProfileSetupModal';
import HomePage from './pages/marketing/HomePage';
import AboutPage from './pages/marketing/AboutPage';
import EmployersPage from './pages/marketing/EmployersPage';
import CandidatesPage from './pages/marketing/CandidatesPage';
import SuccessStoriesPage from './pages/marketing/SuccessStoriesPage';
import FaqPage from './pages/marketing/FaqPage';
import ContactPage from './pages/marketing/ContactPage';
import JobsListPage from './pages/jobs/JobsListPage';
import JobDetailPage from './pages/jobs/JobDetailPage';
import DashboardIndexPage from './pages/dashboard/DashboardIndexPage';
import CandidateDashboardPage from './pages/dashboard/candidate/CandidateDashboardPage';
import CandidateProfilePage from './pages/dashboard/candidate/CandidateProfilePage';
import CandidateApplicationsPage from './pages/dashboard/candidate/CandidateApplicationsPage';
import EmployerDashboardPage from './pages/dashboard/employer/EmployerDashboardPage';
import EmployerCompanyPage from './pages/dashboard/employer/EmployerCompanyPage';
import EmployerJobsPage from './pages/dashboard/employer/EmployerJobsPage';
import EmployerJobNewPage from './pages/dashboard/employer/EmployerJobNewPage';
import EmployerJobEditPage from './pages/dashboard/employer/EmployerJobEditPage';
import EmployerApplicationsPage from './pages/dashboard/employer/EmployerApplicationsPage';
import SettingsPage from './pages/dashboard/SettingsPage';
import AdminPage from './pages/dashboard/AdminPage';
import { Toaster } from './components/ui/sonner';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <StickyNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const employersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/employers',
  component: EmployersPage,
});

const candidatesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/candidates',
  component: CandidatesPage,
});

const successStoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/success-stories',
  component: SuccessStoriesPage,
});

const faqRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/faq',
  component: FaqPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const jobsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/jobs',
  component: JobsListPage,
});

const jobDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/jobs/$slug',
  component: JobDetailPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardIndexPage,
});

const candidateDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/candidate',
  component: CandidateDashboardPage,
});

const candidateProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/candidate/profile',
  component: CandidateProfilePage,
});

const candidateApplicationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/candidate/applications',
  component: CandidateApplicationsPage,
});

const employerDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/employer',
  component: EmployerDashboardPage,
});

const employerCompanyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/employer/company',
  component: EmployerCompanyPage,
});

const employerJobsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/employer/jobs',
  component: EmployerJobsPage,
});

const employerJobNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/employer/jobs/new',
  component: EmployerJobNewPage,
});

const employerJobEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/employer/jobs/$id/edit',
  component: EmployerJobEditPage,
});

const employerApplicationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/employer/applications',
  component: EmployerApplicationsPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/settings',
  component: SettingsPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/admin',
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  employersRoute,
  candidatesRoute,
  successStoriesRoute,
  faqRoute,
  contactRoute,
  jobsRoute,
  jobDetailRoute,
  dashboardRoute,
  candidateDashboardRoute,
  candidateProfileRoute,
  candidateApplicationsRoute,
  employerDashboardRoute,
  employerCompanyRoute,
  employerJobsRoute,
  employerJobNewRoute,
  employerJobEditRoute,
  employerApplicationsRoute,
  settingsRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  
  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-purple mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <RouterProvider router={router} />
      {showProfileSetup && <ProfileSetupModal />}
      <Toaster />
    </>
  );
}
