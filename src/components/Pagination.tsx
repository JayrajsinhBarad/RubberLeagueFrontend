import { useState } from "react";

export default function PaginationScroll() {
  const totalPages = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 sm:px-10 mb-10">
      {/* Scrollable Page Numbers */}
      <div className="overflow-x-auto w-full sm:w-auto">
        <div className="flex gap-2 w-fit">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-[#1F2937] text-white/30 cursor-not-allowed"
                : "bg-[#1F2937] text-white/80"
            }`}
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={`px-3 py-1 rounded whitespace-nowrap ${
                p === currentPage
                  ? "bg-[#8B5CF6] text-white"
                  : "bg-[#1F2937] text-white/70"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-[#1F2937] text-white/30 cursor-not-allowed"
                : "bg-[#1F2937] text-white/80"
            }`}
          >
            ›
          </button>
        </div>
      </div>

      {/* Full screen */}
      <button className="text-sm text-white/80 bg-[#1F2937] px-3 py-1 rounded-md whitespace-nowrap">
        Full screen ↗
      </button>
    </div>
  );
}
