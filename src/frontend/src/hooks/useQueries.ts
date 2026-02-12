import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type {
  UserProfile,
  JobPosting,
  JobFilters,
  JobInput,
  Application,
  CandidateProfile,
  CandidateProfileInput,
  EmployerProfile,
  EmployerProfileInput,
  ApplicationStatusType,
} from '../backend';

// Profile Queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Candidate Profile
export function useGetCandidateProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<CandidateProfile | null>({
    queryKey: ['candidateProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const identity = await actor.getCallerUserProfile();
      if (!identity) return null;
      // Get caller's own profile - backend will validate
      return actor.getCandidateProfile(identity.email as any); // Using email as placeholder, backend uses caller
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useSaveCandidateProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: CandidateProfileInput) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCandidateProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidateProfile'] });
    },
  });
}

// Employer Profile
export function useGetEmployerProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<EmployerProfile | null>({
    queryKey: ['employerProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const identity = await actor.getCallerUserProfile();
      if (!identity) return null;
      return actor.getEmployerProfile(identity.email as any);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useSaveEmployerProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: EmployerProfileInput) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveEmployerProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employerProfile'] });
    },
  });
}

// Jobs
export function useListFilteredJobs(filters: JobFilters) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<JobPosting[]>({
    queryKey: ['jobs', filters],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listFilteredJobs(filters);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetJobBySlug(slug: string) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<JobPosting | null>({
    queryKey: ['job', slug],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getJobBySlug(slug);
    },
    enabled: !!actor && !actorFetching && !!slug,
  });
}

export function useGetJob(jobId: bigint | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<JobPosting | null>({
    queryKey: ['job', jobId?.toString()],
    queryFn: async () => {
      if (!actor || !jobId) return null;
      return actor.getJob(jobId);
    },
    enabled: !!actor && !actorFetching && jobId !== null,
  });
}

export function useSaveJob() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobInput: JobInput) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveJob(jobInput);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
}

export function useUpdateJob() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ jobId, jobInput }: { jobId: bigint; jobInput: JobInput }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateJob(jobId, jobInput);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['job'] });
    },
  });
}

export function useDeleteJob() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteJob(jobId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
}

// Applications
export function useApplyForJob() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.applyForJob(jobId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
}

export function useListCandidateApplications() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Application[]>({
    queryKey: ['candidateApplications'],
    queryFn: async () => {
      if (!actor) return [];
      const identity = await actor.getCallerUserProfile();
      if (!identity) return [];
      return actor.listCandidateApplications(identity.email as any);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useListJobApplications(jobId: bigint | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Application[]>({
    queryKey: ['jobApplications', jobId?.toString()],
    queryFn: async () => {
      if (!actor || !jobId) return [];
      return actor.listJobApplications(jobId);
    },
    enabled: !!actor && !actorFetching && jobId !== null,
  });
}

export function useUpdateApplicationStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ applicationId, status }: { applicationId: bigint; status: ApplicationStatusType }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateApplicationStatus(applicationId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      queryClient.invalidateQueries({ queryKey: ['jobApplications'] });
      queryClient.invalidateQueries({ queryKey: ['candidateApplications'] });
    },
  });
}
