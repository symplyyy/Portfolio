import Link from "next/link";

interface NavlinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function NavLink({ href, children, className = '' }: NavlinkProps) {
  return (
    <Link href={href}>
      <span
        className={`
          relative px-3 py-2 text-sm uppercase italic tracking-widest
          transition-all duration-300 rounded-xl
          hover:bg-[#CDFB52] hover:!text-black hover:scale-105 hover:shadow-md
          ${className || 'text-white'}
        `}
      >
        {children}
      </span>
    </Link>
  );
}
