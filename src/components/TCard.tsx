import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export default function TournamentCard() {
  return (
    <Card className="bg-[#171C26] text-white rounded-2xl w-[340px] h-[520px] mx-auto shadow-lg overflow-hidden">
      <div className="relative w-full h-48">
        <Image
          src="/img/valorant-card.png"
          alt="Knockout Tournament"
          layout="fill"
          objectFit="cover"
          className="rounded-t-2xl"
        />
      </div>

      <CardContent className="p-5 space-y-4">
        <h3 className="text-lg font-semibold">Madrid Chess Academy Royal</h3>

        <div className="flex items-center text-sm text-gray-400">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Sep 20, 2023, 3:00 PM</span>
          <span className="ml-auto text-green-400 font-medium">Starts in 2 days</span>
        </div>

        <div className="flex justify-between items-center text-sm bg-[#0F111A] p-4 rounded-xl">
          <div>
            <p className="text-gray-400 text-xs">PRIZE POOL</p>
            <p className="text-lg font-bold">50,000 🪙</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">PLAYERS</p>
            <p className="text-lg font-bold">10/30</p>
          </div>
        </div>

        <Button className="w-full bg-white text-black font-bold rounded-xl py-2 hover:bg-gray-200 transition">
          Join Tournament
        </Button>
      </CardContent>
    </Card>
  );
}