import * as React from "react"

import { cn } from "@/lib/utils/cn"

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "autofill:border-lt-light-gray border-lt-light-gray/60 focus-visible:ring-offset-lt-gray placeholder:text-lt-lightest-gray focus-visible:ring-lt-white h-10 w-full rounded-full border bg-transparent px-3.5 py-2 text-sm transition-shadow outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium autofill:shadow-[0_0_0px_1000px_rgb(23,23,23)_inset] focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-500",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
