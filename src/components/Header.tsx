"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaDiscord } from "react-icons/fa";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? "text-[#793FED]" : "text-white hover:text-[#793FED]";

  return (
    <header className="bg-[#11141B] text-white">
      <div className="max-w-10/10 mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left side: Discord button */}
        <div className="flex items-center gap-4">
          <FaDiscord size={36} />
          <a
            href="https://discord.gg/uxWmvSaNPA"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#793FED] hover:bg-purple-700 text-white text-sm font-semibold py-2 px-4 rounded-md "
          >
            Join Our Discord
          </a>
        </div>

        {/* Right side: Navigation */}
        <nav className="flex gap-6 text-sm font-semibold">
          <Link href="/" className={isActive("/")}>
            Home
          </Link>
          <Link href="/tournaments" className={isActive("/tournaments")}>
            Tournaments
          </Link>
        </nav>
      </div>
    </header>
  );
}
