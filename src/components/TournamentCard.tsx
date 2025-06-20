import { BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";

export default function TournamentCard() {
  return (
    <div className="relative  rounded-xl p-4 flex flex-col sm:flex-row gap-4 w-full max-w-[700px] mx-auto hover:shadow-lg transition">
      {/* 3 Dots Icon */}
      <div className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer">
        <BsThreeDotsVertical size={18} />
      </div>

      {/* Image */}
      <Image
        src="/img/Valo-omen.jpg"
        alt="Tournament"
        width={230}
        height={140}
        className="rounded-lg w-full sm:w-[230px] h-auto object-cover"
      />

      {/* Content */}
      <div className="flex flex-col gap-1 text-[#95ACDA] text-sm sm:pr-6">
        <h2 className="text-white text-lg font-semibold">
          Valorant 5v5 Tournament
        </h2>

        <p>Mumbai • 5v5 • Prize Pool: ₹500 • 20 slots</p>

        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold">TOMORROW, 10:00 PM</span>
          <span>•</span>
          <span className="uppercase">Registration Fees: Free</span>
        </div>

        <button className="mt-2 bg-[#00BFFF] text-white text-xs px-3 py-1 rounded-full w-fit">
          Open
        </button>
      </div>
    </div>
  );
}
