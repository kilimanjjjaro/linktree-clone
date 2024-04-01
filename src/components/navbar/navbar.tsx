import LinktreeLogo from "@/components/icons/linktree-logo";
import LinksIcon from "@/components/icons/links-icon";
import Avatar from "@/components/ui/avatar";

export default function Navbar() {
  return (
    <header className="border-border bg-background fixed left-4 right-4 top-4 z-50 flex items-center justify-between rounded-full border py-3 pl-6 pr-3">
      <div className="flex items-center gap-x-6">
        <LinktreeLogo className="w-6" />
        <nav className="flex items-center gap-x-5">
          <button className="flex items-center gap-x-2 text-sm">
            <LinksIcon className="size-4" />
            <span>Links</span>
          </button>
        </nav>
      </div>
      <button className="group flex items-center gap-x-4">
        <span>Hi, Gonzalo!</span>
        <Avatar
          className="outline-3 xl:group-hover:outline-border size-10 outline outline-offset-2 outline-transparent transition-[outline] duration-300 ease-in-out"
          src="/images/default-user-avatar.svg"
          alt="Gonzalo"
        />
      </button>
    </header>
  );
}
