export default function LinkPreview() {
  return (
    <div className="flex aspect-[473/932] w-[70vw] items-center justify-center xl:w-80">
      <div className="h-full w-full rounded-[52px] border-4 border-neutral-500 bg-linktree-dark-gray">
        <div className="relative flex h-full w-full justify-center rounded-[48px] border-[12px] border-black">
          <div className="absolute top-3 aspect-[125/37] w-2/6 rounded-full bg-black" />
          <div className="absolute bottom-2 aspect-[125/5] w-2/6 rounded-full bg-linktree-white/50" />
        </div>
      </div>
    </div>
  );
}
