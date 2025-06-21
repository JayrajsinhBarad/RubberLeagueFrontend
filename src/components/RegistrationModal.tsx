"use client";

import { useEffect } from "react";

export default function RegistrationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
      <div className="bg-[#1E293B] rounded-2xl max-w-xl w-full p-6 relative text-white">
        <button className="absolute top-4 right-4 text-white text-2xl" onClick={onClose}>
          ×
        </button>
        <h2 className="text-2xl font-bold mb-1">Registration</h2>
        <p className="text-gray-400 mb-6">Fill the form to enter the tournament lobby.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <input placeholder="In-Game ID" className="bg-[#0F172A] p-3 rounded-md text-white placeholder-gray-400 border border-gray-700" />
          <input placeholder="Email" className="bg-[#0F172A] p-3 rounded-md text-white placeholder-gray-400 border border-gray-700" />
          <input placeholder="Team Name" className="bg-[#0F172A] p-3 rounded-md text-white placeholder-gray-400 border border-gray-700" />
          <input placeholder="Number of Players in Team" className="bg-[#0F172A] p-3 rounded-md text-white placeholder-gray-400 border border-gray-700" />
        </div>
        <button className="bg-[#8B5CF6] w-full py-3 rounded-md text-white font-semibold text-lg hover:bg-[#7C3AED]">
          submit
        </button>
      </div>
    </div>
  );
}
