import { BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";
import { getFormattedDateParts } from "@/helpers/formatDateTime";
import { useEffect, useState } from "react";
import { DateParts, formattedDateParts } from "@/app/tournament-info/[tournamentId]/page";

export interface TournamentCardProps {
  tournamentDetail: any
}

export default function TournamentCard({tournamentDetail}: TournamentCardProps) {
  const [startsAtDateParts, setStartsAtDateParts] = useState<DateParts>(formattedDateParts)

  useEffect(() => {
    const {startsAt} = tournamentDetail

    const startsAtDateParts = getFormattedDateParts(startsAt);
    setStartsAtDateParts(startsAtDateParts);
  }, [tournamentDetail])

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
          {tournamentDetail.name}
        </h2>

        <p>Mumbai • {tournamentDetail.teamSize} • Prize Pool: ₹{tournamentDetail.prizePool} • 20 slots</p>

        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold">{`${startsAtDateParts.day}, ${startsAtDateParts.month} ${startsAtDateParts.date} ${startsAtDateParts.year}, ${startsAtDateParts.time}`}</span>
          <span>•</span>
          <span className="uppercase">Registration Fees: {tournamentDetail.entryPrize ? `₹${tournamentDetail.entryPrize}` : 'FREE'}</span>
        </div>

        <button className="mt-2 bg-[#00BFFF] text-white text-xs px-3 py-1 rounded-full w-fit">
          {tournamentDetail.type}
        </button>
      </div>
    </div>
  );
}
