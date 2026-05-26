import DeviceOverlay from "@/components/trees/preview/device-overlay"
import { Skeleton } from "@/components/ui/skeleton"

export default function PreviewSkeleton() {
  return (
    <div className="flex flex-col items-center self-center">
      <div className="relative flex aspect-[320/630] w-[360px] items-center justify-center">
        <DeviceOverlay />
        <div className="relative flex h-[95%] w-[91%] flex-col gap-y-6 overflow-hidden px-5">
          <div className="flex flex-col items-center pt-[20%]">
            <Skeleton className="size-28 rounded-full" />

            <Skeleton className="mt-5 h-8 w-36 rounded-full" />
            <div className="mt-3 grid justify-items-center gap-y-1">
              <Skeleton className="h-3 w-56 rounded-full" />
              <Skeleton className="h-3 w-48 rounded-full" />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 px-6">
              <Skeleton className="size-7 rounded-full" />
              <Skeleton className="size-7 rounded-full" />
              <Skeleton className="size-7 rounded-full" />
              <Skeleton className="size-7 rounded-full" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-5">
            <Skeleton className="aspect-video h-full rounded-2xl" />
            <Skeleton className="h-14 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
