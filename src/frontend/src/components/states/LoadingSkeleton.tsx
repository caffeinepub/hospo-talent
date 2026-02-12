import { Skeleton } from '../ui/skeleton';

export function JobCardSkeleton() {
  return (
    <div className="border border-border-100 rounded-card p-6 space-y-4">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-24" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

export function JobDetailSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-12 w-3/4" />
      <div className="flex gap-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-32" />
      </div>
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-12 w-48" />
    </div>
  );
}

export function ApplicationCardSkeleton() {
  return (
    <div className="border border-border-100 rounded-card p-6 space-y-3">
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-6 w-24" />
    </div>
  );
}
