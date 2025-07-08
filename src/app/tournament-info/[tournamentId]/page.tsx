"use client";

import Image from "next/image";
import { useState, use, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FaGamepad } from "react-icons/fa";
import { PiUsersThreeFill } from "react-icons/pi";
import { MdDateRange } from "react-icons/md";
import Standings from "@/components/Standings";
import TournamentRegistrationModal from "@/components/TournamentRegitrationModal";
import { getTournamentById } from "@/services/api";
import { getFormattedDateParts, getTimeDiff } from "@/helpers/formatDateTime";




export interface DateParts {
  month: string;
  date: string;
  year: string;
  time: string;
  day: string;
}

export const formattedDateParts: DateParts = {
  month: "",
  date: "",
  year: "",
  time: "",
  day: "",
};

export default function TournamentInfoPage(props: {
  params: Promise<{ tournamentId: string }>;
}) {
  const { tournamentId } = use(props.params);
  const [activeTab, setActiveTab] = useState("overview");
  const [open, setOpen] = useState(false);
  const tabs = ["overview", "standings", "matches", "teams", "prizes"];
   // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const [tournamentDetail, setTournamentDetail] = useState<any>({}); 
  const [timeLeft, setTimeLeft] = useState({
    hoursRemaining: 0,
    hhmmssRemaining: "00:00:00",
  });
  const [startsAtDateParts, setStartsAtDateParts] =
    useState<DateParts>(formattedDateParts);
  const [registrationOpenAtDateParts, setRegistrationOpenAtDateParts] =
    useState<DateParts>(formattedDateParts);
  const [registrationCloseAtDateParts, setRegistrationCloseAtDateParts] =
    useState<DateParts>(formattedDateParts);
  const [noOfRegistredTeam, setNoOfRegisteredTeam] = useState(0);

  const getTournament = async (id: string) => {
    const result = await getTournamentById(id);
    setTournamentDetail(result);
  };

  useEffect(() => {
    getTournament(tournamentId);
  }, [tournamentId]);

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const manageFormattedDateParts = ({ startsAt, registrationOpenAt, registrationCloseAt}: any) => {
    const startsAtDateParts = getFormattedDateParts(startsAt);
    setStartsAtDateParts(startsAtDateParts);

    const registrationOpenAtDateParts =
      getFormattedDateParts(registrationOpenAt);
    setRegistrationOpenAtDateParts(registrationOpenAtDateParts);

    const registrationCloseAtDateParts =
      getFormattedDateParts(registrationCloseAt);
    setRegistrationCloseAtDateParts(registrationCloseAtDateParts);
  };

  useEffect(() => {
    if (tournamentDetail) {
      const {
        startsAt,
        registrationOpenAt,
        registrationCloseAt,
        tournamentTeams,
      } = tournamentDetail;

      setNoOfRegisteredTeam(tournamentTeams?.length ?? 0);

      manageFormattedDateParts({
        startsAt,
        registrationOpenAt,
        registrationCloseAt,
      });

      if (!tournamentDetail.startsAt) return;

      const updateTimer = () =>
        setTimeLeft(getTimeDiff(tournamentDetail.startsAt));

      updateTimer(); // initial call
      const interval = setInterval(updateTimer, 1000);

      return () => clearInterval(interval);
    }
  }, [tournamentDetail]);

  return (
    <main className="min-h-screen bg-[#0F111A] text-white">
      {/* Banner */}
      <div className="relative w-full h-[480px]">
        <Image
          src="/img/valo-omen.jpg"
          alt="Valorant Tournament Banner"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F111A]/80 via-[#0F111A]/90 to-[#0F111A] px-4 sm:px-10 py-8 flex flex-col justify-start sm:justify-start">
          <div className="space-y-2 max-w-[600px]">
            <p className="text-sm sm:text-base text-white font-medium">
              Tournament
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
              {tournamentDetail?.name}
            </h1>
            <p className="text-white/70 text-sm sm:text-base">
              Match begins in {timeLeft.hoursRemaining} hours •{" "}
              {`${startsAtDateParts.day}, ${startsAtDateParts.month} ${startsAtDateParts.date} ${startsAtDateParts.year}, ${startsAtDateParts.time} UTC`}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs px-2 py-1 bg-cyan-500 text-white rounded-full w-fit">
                {tournamentDetail?.type}
              </span>
            </div>

            {/* Mobile region + join button */}
            <div className="sm:hidden space-y-4 mt-30 pt-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-col items-start">
                  <p className="text-white text-lg font-semibold">Regions</p>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <Image
                      src="https://flagcdn.com/w40/in.png"
                      alt="India"
                      width={20}
                      height={15}
                      className="rounded-sm border border-gray-300"
                    />
                    <span>Mumbai</span>
                  </div>
                </div>
                <p className="text-white text-sm font-normal pt-2">
                  Starts in {timeLeft.hhmmssRemaining}
                </p>
              </div>

              {noOfRegistredTeam < 4 && (
                <Button
                  onClick={() => setOpen(true)}
                  className="bg-[#793FED] hover:bg-[#6B21A8] text-white text-sm px-6 py-2 rounded-md shadow-md w-full"
                >
                  Join tournament
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Right desktop overlay */}
        <div className="absolute hidden sm:flex right-10 top-10 flex-col items-end text-sm">
          <div className="flex flex-col items-end gap-0.5 text-white">
            <p className="text-[22px] font-bold">Regions</p>
            <div className="flex items-center gap-2">
              <Image
                src="https://flagcdn.com/w40/in.png"
                alt="India Flag"
                width={24}
                height={16}
                className="rounded-sm border border-gray-300"
              />
              <span className="text-sm font-medium">Mumbai</span>
            </div>
          </div>
          <div className="mt-75 flex flex-col items-center text-center">
            <p className="text-sm text-white font-normal mb-2">
              Starts in {timeLeft.hhmmssRemaining}
            </p>
            {noOfRegistredTeam < 4 && (
              <Button
                onClick={() => setOpen(true)}
                className="bg-[#793FED] hover:bg-[#6B21A8] text-white text-sm px-5 py-2 rounded-md shadow-md"
              >
                Join tournament
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <TournamentRegistrationModal
          tournamentId={tournamentId}
          rank={tournamentDetail?.rank ?? undefined}
          setOpen={(val: boolean) => setOpen(val)}
          reFetchDetails={(id: string) => getTournament(id)}
        />
      )}

      {/* tabs */}
      <div className="bg-[#0F172A] px-4 sm:px-10 pt-14">
        <div className="overflow-x-auto">
          <ul className="flex flex-nowrap justify-start sm:justify-center gap-4 sm:gap-8 text-sm font-semibold text-[#9CA3AF] border-b border-[#1F2430] w-fit mx-auto">
            {tabs.map((tab) => (
              <li
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-2 cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "text-white after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#8B5CF6]"
                    : "hover:text-white"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Section */}
      <main className="bg-[#0F172A] text-white min-h-screen">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16 space-y-16">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 xl:gap-10">
              <div className="xl:col-span-3 space-y-10">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Format</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    <InfoCard
                      icon={<FaGamepad className="text-white text-3xl" />}
                      label="Game"
                      value={tournamentDetail?.game}
                    />
                    <InfoCard
                      icon={
                        <MdDateRange className="text-orange-400 text-3xl" />
                      }
                      label="Date/Time"
                      value={`${startsAtDateParts.day}, ${startsAtDateParts.month} ${startsAtDateParts.date} ${startsAtDateParts.year}, ${startsAtDateParts.time}`}
                    />
                    <InfoCard
                      icon={
                        <PiUsersThreeFill className="text-blue-400 text-3xl" />
                      }
                      label="Team size"
                      value={tournamentDetail?.teamSize}
                    />
                    <InfoCard
                      icon={
                        <Image
                          src="/icons/prize.svg"
                          alt="Prize Icon"
                          width={35}
                          height={35}
                          className="object-contain"
                        />
                      }
                      label="Entry prize"
                      value={
                        tournamentDetail?.entryPrize
                          ? `₹${tournamentDetail.entryPrize}`
                          : "FREE"
                      }
                    />
                    <InfoCard
                      icon={
                        <Image
                          src="/icons/Prize-pool.svg"
                          alt="Prize Icon"
                          width={35}
                          height={35}
                          className="object-contain"
                        />
                      }
                      label="Prize pool"
                      value={`₹${tournamentDetail?.prizePool}`}
                    />
                    <InfoCard
                      icon={
                        <Image
                          src="/icons/format.svg"
                          alt="Prize Icon"
                          width={35}
                          height={35}
                          className="object-contain"
                        />
                      }
                      label="Format"
                      value={tournamentDetail?.format}
                    />
                  </div>
                </div>

                {/* Tournament Info */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Tournament Information</h2>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>
                      Tournament format: {tournamentDetail?.format}{" "}
                      {tournamentDetail?.teamSize}
                    </li>
                    <li>
                      Server: Mumbai / Singapore (decided by mutual agreement)
                    </li>
                  </ul>

                  {tournamentDetail?.rules?.length !== 0 && (
                    <div>
                      <h3 className="text-lg font-bold mb-2">Rules</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2">
                      {{/* eslint-disable  @typescript-eslint/no-explicit-any */}}
                        {tournamentDetail?.rules?.map(
                          (rule: any, index: number) => (
                            <li key={index}>{rule}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-bold mb-2">Help</h3>
                    <p className="text-gray-300">
                      For any issues or disputes, contact the tournament admins
                      via the official Discord support channel.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-2">Reports:</h3>
                    <p className="text-gray-300">
                      Report players for cheating, toxicity, smurfing, or rule
                      violations in the official Discord report channel.
                    </p>
                  </div>
                </div>
              </div>

              <div className="xl:col-span-1 space-y-10">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold p-2 rounded">Teams</h3>
                  <div className="w-full h-auto p-4 rounded-xl border border-[#2F384C] flex flex-row sm:flex-row justify-between items-center gap-4 sm:gap-0 text-sm text-blue-300">
                    <div className="text-center flex-1">
                      <p className="font-medium">Registered</p>
                      <p className="text-white text-lg font-normal">
                        {noOfRegistredTeam * 5}
                      </p>
                    </div>
                    {/* <div className="text-center flex-1">
                      <p className="font-medium flex items-center justify-center gap-1">
                        Ready
                      </p>
                      <p className="text-white text-lg font-normal">10</p>
                    </div> */}
                    <div className="text-center flex-1">
                      <p className="font-medium">Slots</p>
                      <p className="text-white text-lg font-normal">20</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold">Timeline</h3>
                  <div className="space-y-5">
                    <TimelineItem
                      date={registrationOpenAtDateParts.month}
                      day={registrationOpenAtDateParts.date}
                      time={`${registrationOpenAtDateParts.day} ${registrationOpenAtDateParts.time}`}
                      title="Ready window opens"
                      description="Ready up and verify that you're eligible to play."
                    />
                    <TimelineItem
                      date={registrationCloseAtDateParts.month}
                      day={registrationCloseAtDateParts.date}
                      time={`${registrationCloseAtDateParts.day} ${registrationCloseAtDateParts.time}`}
                      title="Registration closes"
                      description="You can no longer register."
                    />
                    <TimelineItem
                      date={registrationCloseAtDateParts.month}
                      day={registrationCloseAtDateParts.date}
                      time={`${registrationCloseAtDateParts.day} ${registrationCloseAtDateParts.time}`}
                      title="Ready window closes"
                      description="You can no longer ready up."
                    />
                    <TimelineItem
                      date={startsAtDateParts.month}
                      day={startsAtDateParts.date}
                      time={`${startsAtDateParts.day} ${startsAtDateParts.time}`}
                      title="Start"
                      description="The tournament starts and you will get notified about your first match."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {activeTab === "standings" && (
          <div className="px-4 sm:px-10 py-10">
            <Standings />
          </div>
        )}
      </main>
    </main>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-[#15213A] rounded-xl px-4 py-4 w-full h-[120px] flex flex-col justify-between">
      <div className="mb-2">{icon}</div>
      <div className="text-sm text-gray-300 font-medium">{label}</div>
      <div className="text-white font-semibold text-sm">{value}</div>
    </div>
  );
}

function TimelineItem({
  date,
  day,
  time,
  title,
  description,
}: {
  date: string;
  day: string;
  time: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex flex-col items-center justify-center w-12 h-14 bg-[#0F111A] border border-white/20 rounded-md">
        <span className="text-[10px] text-white font-semibold">{date}</span>
        <span className="text-base text-white font-bold">{day}</span>
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm text-white/70">{time}</p>
        <p className="text-white font-bold">{title}</p>
        <p className="text-white text-sm">{description}</p>
      </div>
    </div>
  );
}
