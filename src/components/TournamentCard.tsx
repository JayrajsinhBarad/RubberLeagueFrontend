import { BsThreeDotsVertical } from "react-icons/bs";

import Image from "next/image";

export default function TournamentCard() {
  return (
    <div className="relative flex items-start gap-4 p-4 rounded-xl ml-5 text-white">
      {/* 3 Dots Icon */}
      <div className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer">
        <BsThreeDotsVertical size={18} />
      </div>

      {/* Card Image */}
 {/* Card Content */}
  <Image src="/img/valorant-card.png" alt="Tournament" width={230} height={140} className="rounded-lg" />

      <div className="flex flex-col gap-1 text-[#95ACDA] text-sm pr-6">
        {/* Title */}
        <h2 className="text-white text-lg font-semibold mb-1">
          Valorant 5v5 Tournament
        </h2>

        {/* Info line */}
        <p className="">Mumbai • 5v5 • Prize Pool: ₹500 • 20 slots</p>

        {/* Date + Fees */}
        <div className="flex items-center gap-2">
          <span className="font-semibold">TOMORROW, 10:00 PM</span>
          <span>•</span>
          <span>REGISTRATION FEES : FREE</span>
        </div>

        {/* Smaller Open Button */}
        <button className="mt-2 bg-[#00BFFF] text-white text-xs px-3 py-1 rounded-full w-fit">
          Open
        </button>
      </div>
    </div>
  );
}
