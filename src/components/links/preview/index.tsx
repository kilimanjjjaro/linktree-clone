export default function LinkPreview() {
  return (
    <div className='flex aspect-[473/932] w-[70vw] items-center justify-center xl:w-80'>
      <div className='size-full rounded-[52px] border-[3px] border-lt-lightest-gray bg-lt-gray'>
        <div className='relative flex size-full justify-center rounded-[48px] border-[12px] border-black'>
          <div className='absolute top-3 aspect-[125/37] w-2/6 rounded-full bg-black' />
          <div className='absolute bottom-2 aspect-[125/5] w-2/6 rounded-full bg-lt-lightest-gray' />
        </div>
      </div>
    </div>
  )
}
