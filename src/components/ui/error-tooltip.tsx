export const ErrorTooltip = ({ errors }: { errors: string[] }) => {
  console.log('errors', errors)
  return (
    <div className='absolute -top-7 right-0 flex w-full items-center justify-end gap-1.5'>
      {errors.map((error) => (
        <span
          key={error}
          className='rounded-full border border-red-400/60 bg-red-500 px-1.5 py-0.5 text-[10px] leading-none'
        >
          {error}
        </span>
      ))}
    </div>
  )
}
