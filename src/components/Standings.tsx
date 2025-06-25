"use client";
import { FaUsers } from "react-icons/fa";

export default function Standings() {
  return (
    <div className="px-4 sm:px-10 py-10 space-y-6">
      {/* Pagination */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-1 flex-wrap">
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
        <button className="text-sm text-white/80 bg-[#1F2937] px-3 py-1 rounded-md">
          Full screen ↗
        </button>
      </div>

      {/* Brackets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Semi finals */}
        <div>
          <h3 className="text-white font-bold text-xl">Semi finals</h3>
          <p className="text-sm text-white/60 mb-4">2 matches</p>
          <div className="space-y-4">
            {[1, 2].map((match) => (
              <div
                key={match}
                className="bg-[#1E293B] rounded-md p-4 flex flex-col gap-2"
              >
                <div className="text-xs text-cyan-400 font-bold">
                  Waiting Match {match}
                </div>
                <MatchLine />
                <MatchLine />
              </div>
            ))}
          </div>
        </div>

        {/* Final */}
        <div>
          <h3 className="text-white font-bold text-xl">Final</h3>
          <p className="text-sm text-white/60 mb-4">1 matches</p>
          <div className="space-y-4">
            <div className="bg-[#1E293B] rounded-md p-4 flex flex-col gap-2">
              <div className="text-xs text-cyan-400 font-bold">Waiting Match 3</div>
              <MatchLine />
              <MatchLine />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MatchLine() {
  return (
    <div className="flex justify-between items-center text-sm text-white/80 bg-[#111827] rounded px-3 py-2">
      <div className="flex items-center gap-2">
        <FaUsers className="text-white/60" />
        <span>To be decided</span>
      </div>
      <span>0</span>
    </div>
  );
}
