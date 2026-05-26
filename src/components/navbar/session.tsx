import Image from "next/image"
import { type DefaultSession } from "next-auth"

import LogOutButton from "@/components/navbar/logout-button"
import DeleteAccountButton from "@/components/navbar/delete-account-button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

interface Props {
  user: DefaultSession["user"]
}

export default async function SessionBar({ user }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="border-lt-light-gray/60 focus-visible:ring-lt-white focus-visible:ring-offset-lt-gray relative flex aspect-square h-full cursor-pointer items-center justify-center overflow-hidden rounded-full border transition-opacity outline-none focus-visible:ring-2 focus-visible:ring-offset-2 xl:hover:opacity-70">
          {user !== undefined ? (
            <Image
              className="absolute size-full object-cover object-center"
              src={user.image ?? "/images/default-user-avatar.svg"}
              alt={`${user.name}'s avatar`}
              width={50}
              height={50}
              priority
            />
          ) : (
            <Skeleton className="aspect-square h-full rounded-full" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-auto">
        <DropdownMenuGroup>
          <DeleteAccountButton />
          <DropdownMenuSeparator />
          <LogOutButton />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
