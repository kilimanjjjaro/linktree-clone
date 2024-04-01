import Navbar from "@/components/navbar/navbar";
import { Toaster } from "@/components/ui/toaster";
import type { ChildrenType } from "@/lib/types/globals";

export default function Wrapper({ children }: Readonly<ChildrenType>) {
  return (
    <>
      <Navbar />
      <Toaster />
      {children}
    </>
  );
}
