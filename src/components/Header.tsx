"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaDiscord } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) =>
    pathname === path ? "text-[#793FED]" : "text-white hover:text-[#793FED]";

  return (
    <header className="bg-[#11141B] text-white relative z-50">
      <div className="max-w-full mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left side: Discord button */}
        <div className="flex items-center gap-3">
          <FaDiscord size={28} />
          <a
            href="https://discord.gg/uxWmvSaNPA"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#793FED] hover:bg-purple-700 text-white text-xs py-1.5 px-3 rounded-md font-medium"
          >
            Join Our Discord
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-sm font-bold">
          <Link href="/" className={isActive("/")}>
            Home
          </Link>
          <Link
            href="/#tournaments"
            className="text-white font-bold hover:text-[#793FED]"
          >
            Tournaments
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Nav */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 bg-[#11141B] shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col items-end px-6 py-4">
          <button onClick={() => setIsMenuOpen(false)} className="mb-4">
            <HiX size={24} />
          </button>
          <nav className="flex flex-col gap-4 text-sm font-bold text-right">
            <Link
              href="/"
              className={isActive("/")}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/#tournaments"
              className="text-white font-bold hover:text-[#793FED]"
              onClick={() => setIsMenuOpen(false)}
            >
              Tournaments
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
