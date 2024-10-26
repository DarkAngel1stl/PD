import { cn } from 'clsx-tailwind-merge';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('animate-pulse bg-gray-300', className)} {...props} />
  );
}

export { Skeleton };
