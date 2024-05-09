import { Skeleton } from "./ui/skeleton";

export function ModalSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4" />
      <Skeleton className="h-20" />
    </div>
  );
}
