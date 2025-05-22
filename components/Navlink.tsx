import Link from "next/link";

interface NavlinkProps {
  href: string;
  children: React.ReactNode;
  scrolled?: boolean;         // nouveau prop
}

export default function NavLink({ href, children, scrolled }: NavlinkProps) {
  return (
    <Link href={href}>
      <span
        className={`
          relative px-3 py-2 text-sm uppercase italic tracking-widest
          transition-all duration-300 rounded-xl
          hover:bg-[#CDFB52] hover:text-black hover:scale-105 hover:shadow-md
          ${scrolled ? "text-black" : "text-white"}  // on inverse ici
        `}
      >
        {children}
      </span>
    </Link>
  );
}
