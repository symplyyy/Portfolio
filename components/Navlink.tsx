import Link from "next/link";

interface NavlinkProps {
  href: string;
  children: React.ReactNode;
}

export default function Navlink({ href, children }: NavlinkProps) {
  return (
    <Link href={href}>
      <span
        className="relative px-3 py-2 text-sm uppercase italic tracking-widest text-white transition-all duration-300
                   hover:bg-[#CDFB52] hover:text-black hover:scale-105 hover:shadow-md rounded-xl"
      >
        {children}
      </span>
    </Link>
  );
}
