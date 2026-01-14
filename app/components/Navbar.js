"use client";

import { useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  if (typeof window !== "undefined") {
    if (!scrolled) {
      window.addEventListener("scroll", () => {
        setScrolled(window.scrollY > 10);
      });
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-lg shadow-indigo-500/"
          : "bg-gradient-to-b from-slate-900/60 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo section */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 shadow-md shadow-indigo-500/30 flex items-center justify-center text-white font-bold text-lg group-hover:shadow-indigo-500/50 group-hover:scale-105 transition-all duration-300">
            ⚡
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold gradient-text">Pokédex</span>
            <span className="text-xs text-slate-400">Dashboard</span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="hidden gap-6 text-sm font-medium sm:flex">
          <a
            className="text-slate-300 hover:text-indigo-400 transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-indigo-500 after:to-purple-500 hover:after:w-full after:transition-all after:duration-300"
            href="#"
          >
            Home
          </a>
          <a
            className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-cyan-500 after:to-blue-500 hover:after:w-full after:transition-all after:duration-300"
            href="https://pokeapi.co/"
            target="_blank"
            rel="noreferrer"
          >
            API
          </a>
          <a
            className="text-slate-300 hover:text-purple-400 transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 hover:after:w-full after:transition-all after:duration-300"
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </nav>

        {/* Mobile menu placeholder */}
        <button className="sm:hidden text-slate-300 hover:text-indigo-400 transition-colors duration-300">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
