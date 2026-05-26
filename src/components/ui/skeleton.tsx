import { cn } from "@/lib/utils/cn"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-lt-light-gray border-lt-lightest-gray/10 animate-pulse rounded-md border",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
