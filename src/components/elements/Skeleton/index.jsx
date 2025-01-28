import { cn } from "@/utils/helper";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "h-6 w-8 animate-pulse rounded-md bg-neutral-500 dark:bg-dark-700",
        className,
      )}
      {...props}
    />
  );
}

export default Skeleton;
