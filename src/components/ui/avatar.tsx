import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  className: string;
  src: string;
  alt: string;
}

export default function Avatar({ className, src, alt }: Props) {
  return (
    <div className={cn("relative overflow-hidden rounded-full", className)}>
      <Image
        className="absolute h-auto w-full object-cover object-center"
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </div>
  );
}
