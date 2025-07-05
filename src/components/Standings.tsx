"use client";

import { useRef } from "react";
import { FaUsers } from "react-icons/fa";
import { LuExternalLink } from "react-icons/lu";
import { PiBracketsCurlyBold } from "react-icons/pi";

export default function Standings() {
  const bracketRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    const element = bracketRef.current;
    if (!element) return;

    if (!document.fullscreenElement) {
      element.requestFullscreen().catch((err) => {
        console.error("Error trying to enable full-screen mode:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="bg-[#0F172A] text-white px-4 sm:px-10 py-10">
      {/* Pagination + Fullscreen */}
      <div className="flex justify-between items-center flex-wrap gap-4 max-w-6xl mx-auto mb-10">
        <div className="flex gap-1 flex-wrap items-center">
          <button className="px-2 py-1 rounded bg-[#1F2937]">«</button>
          {[1, 2, 3, 4, 5, 6].map((p) => (
            <button
              key={p}
              className={`px-3 py-1 rounded ${
                p === 1
                  ? "bg-[#8B5CF6] text-white"
                  : "bg-[#1F2937] text-white/70"
              }`}
            >
              {p}
            </button>
          ))}
          <button className="px-2 py-1 rounded bg-[#1F2937]">»</button>
        </div>
        <button
          onClick={toggleFullscreen}
          className="text-sm text-white/80 bg-[#1F2937] px-3 py-1 rounded-md"
        >
          Full screen ↗
        </button>
      </div>

      {/* Brackets */}
      <div ref={bracketRef} className="overflow-x-auto">
        <div className="flex justify-center gap-12 min-w-[900px] pb-10">
          {/* Semi Finals */}
          <div className="flex flex-col justify-center gap-12">
            <h3 className="text-white text-lg font-bold mb-1 pl-2 flex items-center gap-2">
              <PiBracketsCurlyBold className="text-2xl" />
              0            </h3>

            {[1, 2].map((match) => (
              <div
                key={match}
                className="bg-[#1F2633] rounded-xl px-4 py-3 w-72 space-y-2 relative"
              >
                <div className="flex items-center justify-between text-sm text-blue-300">
                  <div className="flex gap-2 items-center">
                    <span className="text-xs bg-[#263040] px-2 py-0.5 rounded-full">
                      Waiting
                    </span>
                    Match {match}
                  </div>
                  <LuExternalLink className="text-gray-400 text-xs" />
                </div>
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-sm text-white/90 bg-[#263040] px-3 py-2 rounded-md"
                  >
                    <span className="flex items-center gap-2">
                      <FaUsers className="text-white/40 text-xs" />
                      To be decided
                    </span>
                    <span>0</span>
                  </div>
                ))}

                {/* Horizontal line to Final */}
                <div className="absolute right-[-24px] top-1/2 transform -translate-y-1/2 h-[1px] w-6 bg-gray-500" />
              </div>
            ))}
          </div>

          {/* Final */}
          <div className="flex flex-col justify-center gap-6">
            <h3 className="text-white text-lg font-bold mb-1 pl-2 flex items-center gap-2">
              <PiBracketsCurlyBold className="text-2xl" />
              Final
            </h3>

            <div className="bg-[#1F2633] rounded-xl px-4 py-3 w-72 space-y-2 relative">
              <div className="flex items-center justify-between text-sm text-blue-300">
                <div className="flex gap-2 items-center">
                  <span className="text-xs bg-[#263040] px-2 py-0.5 rounded-full">
                    Waiting
                  </span>
                  Match 3
                </div>
                <LuExternalLink className="text-gray-400 text-xs" />
              </div>
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-sm text-white/90 bg-[#263040] px-3 py-2 rounded-md"
                >
                  <span className="flex items-center gap-2">
                    <FaUsers className="text-white/40 text-xs" />
                    To be decided
                  </span>
                  <span>0</span>
                </div>
              ))}

              {/* Horizontal line to Champion */}
              <div className="absolute right-[-24px] top-1/2 transform -translate-y-1/2 h-[1px] w-6 bg-gray-500" />
            </div>
          </div>

          {/* Champion */}
          <div className="flex flex-col justify-center gap-6">
            <h3 className="text-white text-lg font-bold mb-1 pl-2 flex items-center gap-2">
              <PiBracketsCurlyBold className="text-2xl" />
              Champion
            </h3>
            <div className="bg-[#1F2633] rounded-xl px-4 py-3 w-72 space-y-2">
              <div className="flex justify-between items-center text-sm text-white/90 bg-[#263040] px-3 py-2 rounded-md">
                <span className="flex items-center gap-2">
                  <FaUsers className="text-white/40 text-xs" />
                  To be decided
                </span>
                <span>0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
