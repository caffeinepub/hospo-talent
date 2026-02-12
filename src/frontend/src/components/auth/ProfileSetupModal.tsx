import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { useSaveCallerUserProfile } from '../../hooks/useQueries';
import { AppRole } from '../../backend';
import { toast } from 'sonner';
import { normalizeError } from '../../lib/errors';

export default function ProfileSetupModal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'candidate' | 'employer'>('candidate');
  const saveProfile = useSaveCallerUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const appRole = role === 'candidate' 
        ? AppRole.candidate 
        : AppRole.employer;
      
      await saveProfile.mutateAsync({
        name: name.trim(),
        email: email.trim(),
        appRole,
      });
      toast.success('Profile created successfully!');
    } catch (error) {
      toast.error(normalizeError(error));
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">Welcome to HOSPO TALENT</DialogTitle>
          <DialogDescription>
            Let's set up your profile to get started. This will only take a moment.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="space-y-3">
            <Label>I am a...</Label>
            <RadioGroup value={role} onValueChange={(value) => setRole(value as 'candidate' | 'employer')}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="candidate" id="candidate" />
                <Label htmlFor="candidate" className="font-normal cursor-pointer">
                  Job Seeker (Candidate)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="employer" id="employer" />
                <Label htmlFor="employer" className="font-normal cursor-pointer">
                  Employer (Hiring Manager)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button
            type="submit"
            disabled={saveProfile.isPending}
            className="w-full bg-light-lavender hover:bg-soft-accent text-ink-900 font-semibold"
          >
            {saveProfile.isPending ? 'Creating Profile...' : 'Complete Setup'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
