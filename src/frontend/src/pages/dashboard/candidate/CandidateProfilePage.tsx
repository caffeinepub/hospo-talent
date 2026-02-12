import { useState, useEffect } from 'react';
import { useSEO } from '../../../lib/seo';
import { useGetCandidateProfile, useSaveCandidateProfile } from '../../../hooks/useQueries';
import RequireAuth from '../../../components/auth/RequireAuth';
import RequireAppRole from '../../../components/auth/RequireAppRole';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Label } from '../../../components/ui/label';
import InlineAlert from '../../../components/states/InlineAlert';
import { toast } from 'sonner';
import { normalizeError } from '../../../lib/errors';

export default function CandidateProfilePage() {
  useSEO({
    title: 'My Profile',
    description: 'Manage your candidate profile.',
  });

  const { data: profile, isLoading } = useGetCandidateProfile();
  const saveMutation = useSaveCandidateProfile();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [resume, setResume] = useState('');

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
      setExperience(profile.experience);
      setSkills(profile.skills.join(', '));
      setResume(profile.resume || '');
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await saveMutation.mutateAsync({
        name: name.trim(),
        email: email.trim(),
        experience: experience.trim(),
        skills: skills.split(',').map(s => s.trim()).filter(Boolean),
        resume: resume.trim() || undefined,
      });
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(normalizeError(error));
    }
  };

  return (
    <RequireAuth>
      <RequireAppRole allowedRoles={['candidate']}>
        <div className="section-padding">
          <div className="container-custom max-w-3xl">
            <h1 className="font-heading text-4xl font-bold mb-8">
              My <span className="text-emphasis">Profile</span>
            </h1>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-purple mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading profile...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience</Label>
                  <Textarea
                    id="experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="Describe your hospitality experience..."
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Input
                    id="skills"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="e.g., Customer Service, Food Safety, Team Leadership"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume">CV / Resume URL (optional)</Label>
                  <Input
                    id="resume"
                    value={resume}
                    onChange={(e) => setResume(e.target.value)}
                    placeholder="Link to your CV or resume"
                  />
                  <p className="text-sm text-muted-foreground">
                    Provide a link to your CV hosted online (e.g., Google Drive, Dropbox)
                  </p>
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
