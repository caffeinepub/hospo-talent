import { useState, useEffect } from 'react';
import { useSEO } from '../../../lib/seo';
import { useGetEmployerProfile, useSaveEmployerProfile } from '../../../hooks/useQueries';
import RequireAuth from '../../../components/auth/RequireAuth';
import RequireAppRole from '../../../components/auth/RequireAppRole';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Label } from '../../../components/ui/label';
import { toast } from 'sonner';
import { normalizeError } from '../../../lib/errors';

export default function EmployerCompanyPage() {
  useSEO({
    title: 'Company Profile',
    description: 'Manage your company profile.',
  });

  const { data: profile, isLoading } = useGetEmployerProfile();
  const saveMutation = useSaveEmployerProfile();

  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [companyLocation, setCompanyLocation] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (profile) {
      setCompanyName(profile.companyName);
      setCompanyDescription(profile.companyDescription);
      setCompanyLocation(profile.companyLocation);
      setEmail(profile.email);
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await saveMutation.mutateAsync({
        companyName: companyName.trim(),
        companyDescription: companyDescription.trim(),
        companyLocation: companyLocation.trim(),
        email: email.trim(),
      });
      toast.success('Company profile updated successfully!');
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
              Company <span className="text-emphasis">Profile</span>
            </h1>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-purple mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading profile...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyLocation">Location</Label>
                  <Input
                    id="companyLocation"
                    value={companyLocation}
                    onChange={(e) => setCompanyLocation(e.target.value)}
                    placeholder="e.g., London, UK"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyDescription">Company Description</Label>
                  <Textarea
                    id="companyDescription"
                    value={companyDescription}
                    onChange={(e) => setCompanyDescription(e.target.value)}
                    placeholder="Tell candidates about your company..."
                    rows={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="w-full bg-light-lavender hover:bg-soft-accent text-ink-900 font-semibold"
                >
                  {saveMutation.isPending ? 'Saving...' : 'Save Profile'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </RequireAppRole>
    </RequireAuth>
  );
}
