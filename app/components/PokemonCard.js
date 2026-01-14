"use client";

import { useInViewport } from "@/app/hooks/useInViewport";
import { useState } from "react";

const typeColors = {
  fire: "from-red-600 to-orange-500",
  water: "from-blue-600 to-cyan-500",
  grass: "from-green-600 to-emerald-500",
  electric: "from-yellow-500 to-amber-400",
  ice: "from-blue-300 to-cyan-400",
  fighting: "from-red-700 to-rose-600",
  poison: "from-purple-600 to-violet-500",
  ground: "from-yellow-700 to-amber-600",
  flying: "from-blue-400 to-indigo-400",
  psychic: "from-purple-500 to-pink-500",
  bug: "from-green-700 to-lime-600",
  rock: "from-gray-600 to-stone-500",
  ghost: "from-purple-700 to-indigo-600",
  dragon: "from-indigo-700 to-purple-600",
  dark: "from-gray-800 to-slate-700",
  steel: "from-gray-400 to-slate-500",
  fairy: "from-pink-600 to-rose-500",
};

export default function PokemonCard({ pokemon }) {
  const { ref, isVisible, hasBeenVisible } = useInViewport({ threshold: 0.2 });
  const [hovered, setHovered] = useState(false);

  const primaryType = pokemon.types[0]?.type.name || "normal";
  const gradientClass = typeColors[primaryType] || "from-gray-600 to-gray-500";

  return (
    <div
      ref={ref}
      className="group h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hasBeenVisible ? (
        <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 card-3d shadow-3d hover:shadow-2xl">
          {/* Gradient overlay based on type */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Header with ID */}
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-xl font-bold capitalize text-white group-hover:gradient-text transition-all duration-300">
                {pokemon.name}
              </h2>
              <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/20 px-2 py-1 rounded-lg">
                #{pokemon.id.toString().padStart(3, "0")}
              </span>
            </div>

            {/* Image section with 3D effect */}
            <div className="flex-1 flex items-center justify-center relative mb-4 bg-gradient-to-b from-slate-700/40 to-slate-800/40 rounded-xl p-4 backdrop-blur-sm border border-slate-700/50 overflow-hidden">
              {/* Subtle animated background */}
              <div className="absolute inset-0 opacity-30">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`}
                  style={{
                    opacity: hovered ? 0.1 : 0,
                    transition: "opacity 0.3s ease",
                  }}
                />
              </div>

              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-32 h-32 object-contain relative z-10 filter group-hover:brightness-110 transition-all duration-300"
                loading="lazy"
              />
            </div>

            {/* Stats section */}
            <div className="mb-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                {pokemon.height && (
                  <div className="bg-slate-700/50 rounded-lg p-2 border border-slate-600/50">
                    <p className="text-xs text-slate-400">Height</p>
                    <p className="font-semibold text-slate-100">
                      {(pokemon.height / 10).toFixed(1)}m
                    </p>
                  </div>
                )}
                {pokemon.weight && (
                  <div className="bg-slate-700/50 rounded-lg p-2 border border-slate-600/50">
                    <p className="text-xs text-slate-400">Weight</p>
                    <p className="font-semibold text-slate-100">
                      {(pokemon.weight / 10).toFixed(1)}kg
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Type badges */}
            <div className="flex flex-wrap gap-2">
              {pokemon.types.map((type) => (
                <span
                  key={type.type.name}
                  className={`inline-block bg-gradient-to-r ${typeColors[type.type.name] || typeColors.normal} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300 capitalize`}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>

          {/* Shimmer effect on hover */}
          <div
            className="absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none"
            style={{
              transform: hovered ? "translateX(100%)" : "translateX(-100%)",
              transition: "transform 0.6s ease",
            }}
          />
        </div>
      ) : (
        /* Skeleton loader */
        <div className="animate-pulse bg-slate-800/50 rounded-2xl p-6 h-full">
          <div className="h-6 bg-slate-700/50 rounded w-24 mb-3" />
          <div className="h-32 bg-slate-700/50 rounded-xl mb-4" />
          <div className="space-y-2">
            <div className="h-4 bg-slate-700/50 rounded w-32" />
            <div className="h-4 bg-slate-700/50 rounded w-24" />
          </div>
        </div>
      )}
    </div>
  );
}