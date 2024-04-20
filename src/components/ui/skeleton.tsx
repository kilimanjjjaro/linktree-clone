import { cn } from '@/lib/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-lt-light-gray border border-lt-lightest-gray/10',
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
