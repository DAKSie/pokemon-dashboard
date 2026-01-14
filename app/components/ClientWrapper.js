"use client";

import { useMemo, useState } from "react";
import PokemonCard from "./PokemonCard";
import { useInViewport } from "@/app/hooks/useInViewport";

export default function ClientWrapper({ data }) {
  const [query, setQuery] = useState("");
  const { ref: titleRef, isVisible: titleVisible } = useInViewport({
    threshold: 0.3,
  });

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return data;
    return data.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(term)
    );
  }, [data, query]);

  return (
    <section className="space-y-8">
      {/* Hero section with title and description */}
      <div ref={titleRef} className="relative overflow-hidden rounded-3xl glass shadow-3d p-8 md:p-12">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/10 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" weird-ahh-class/>

        <div className={`relative z-10 transition-all duration-700 transform ${
          titleVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Pokédex Explorer
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
            Discover and explore detailed information about Pokémon. Search for
            your favorites or browse through our interactive collection with
            stunning visual effects.
          </p>

          {/* Visual accent */}
          <div className="mt-6 flex gap-2">
            <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
            <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-70" />
          </div>
        </div>
      </div>

      {/* Search section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Search Results
          </h3>
          <p className="text-sm text-slate-400">
            Found {filtered.length} Pokémon
          </p>
        </div>

        <div className="w-full sm:w-72">
          <div className="relative group">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors group-focus-within:text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name..."
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 pl-10 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Results section */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 glass rounded-2xl p-8">
          <svg
            className="w-16 h-16 text-slate-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-slate-300 text-lg font-medium">
            No Pokémon match that search.
          </p>
          <p className="text-slate-400 text-sm mt-2">
            Try searching for a different name
          </p>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>

          {/* Footer info */}
          <div className="mt-12 text-center">
            <p className="text-slate-400 text-sm">
              Showing {filtered.length} of {data.length} Pokémon •{" "}
              <span className="text-indigo-400">Ready for more?</span>
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
