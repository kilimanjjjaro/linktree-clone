export default function DeviceOverlay() {
  return (
    <svg
      className='pointer-events-none absolute inset-0 z-10 w-full select-none'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 320 630'
      fill='none'
    >
      <path
        fill='gray'
        fillRule='evenodd'
        d='M52 0C23.281 0 0 23.281 0 52v526c0 28.719 23.281 52 52 52h216c28.719 0 52-23.281 52-52V52c0-28.719-23.281-52-52-52H52Zm1 3C25.386 3 3 25.386 3 53v524c0 27.614 22.386 50 50 50h214c27.614 0 50-22.386 50-50V53c0-27.614-22.386-50-50-50H53Z'
        clipRule='evenodd'
      />
      <path
        fill='#040404'
        fillRule='evenodd'
        d='M53 3C25.386 3 3 25.386 3 53v524c0 27.614 22.386 50 50 50h214c27.614 0 50-22.386 50-50V53c0-27.614-22.386-50-50-50H53Zm2 12c-22.091 0-40 17.909-40 40v520c0 22.091 17.909 40 40 40h210c22.091 0 40-17.909 40-40V55c0-22.091-17.909-40-40-40H55Z'
        clipRule='evenodd'
      />
      <path
        fill='#040404'
        d='M112 40c0-7.732 6.268-14 14-14h68c7.732 0 14 6.268 14 14s-6.268 14-14 14h-68c-7.732 0-14-6.268-14-14Z'
      />
      <path
        fill='white'
        fillOpacity='.5'
        d='M112 602a2 2 0 0 1 2-2h92a2 2 0 1 1 0 4h-92a2 2 0 0 1-2-2Z'
      />
    </svg>
  )
}
