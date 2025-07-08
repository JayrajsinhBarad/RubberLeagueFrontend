import { registerToTournament } from "@/services/api";
import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";

enum ValorantRank {
  Iron = "Iron",
  Bronze = "Bronze",
  Silver = "Silver",
  Gold = "Gold",
  Platinum = "Platinum",
  Diamond = "Diamond",
  Ascendant = "Ascendant",
  Immortal = "Immortal",
  Radiant = "Radiant",
}

type Player = {
  inGameId: string;
  rank: ValorantRank;
};

export type RegistrationValues = {
  name: string;
  email: string;
  playersInTeam: number;
  players: Player[];
};

const MAX_PLAYERS = 5;

interface TournamentRegitrationProps {
  tournamentId: string;
  rank?: ValorantRank;
  setOpen: (val: boolean) => void;
  reFetchDetails: (id: string) => Promise<void>;
}

const TournamentRegistrationModal = ({
  tournamentId,
  rank,
  setOpen,
  reFetchDetails,
}: TournamentRegitrationProps) => {
  const [agreed, setAgreed] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
  } = useForm<RegistrationValues>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      playersInTeam: 1,
      players: [],
    },
  });

  const playersInTeam = useWatch({ control, name: "playersInTeam" });
  const validPlayerCount =
    Number(playersInTeam) >= 1 && Number(playersInTeam) <= MAX_PLAYERS;

  const onSubmit = async (data: RegistrationValues) => {
    try {
      if (!agreed || !validPlayerCount) return;
      await registerToTournament(tournamentId, data);
      await reFetchDetails(tournamentId);
      toast.success("Registered successfully!");
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    } finally {
      setOpen(false);
    }
  };

  const playerFields = Array.from({
    length: validPlayerCount ? Number(playersInTeam) : 0,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-[#1A2238] rounded-2xl p-6 w-full max-w-2xl relative max-h-[90vh] overflow-hidden">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-white text-xl font-bold"
        >
          ×
        </button>
        <h2 className="text-3xl font-bold text-white mb-2">Registration</h2>
        <p className="text-gray-400 mb-4">
          Fill the form to enter the tournament lobby.
        </p>

        {/* Scrollable Form Content */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm overflow-y-auto pr-2"
          style={{ maxHeight: "65vh" }}
        >
          {/* Team Name */}
          <div className="flex flex-col">
            <input
              placeholder="Team Name"
              {...register("name", { required: "Team name is required." })}
              className="bg-[#111827] text-white px-4 py-3 rounded-md border border-gray-600"
            />
            {errors.name && (
              <span className="text-red-400 text-xs mt-1">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format.",
                },
              })}
              className="bg-[#111827] text-white px-4 py-3 rounded-md border border-gray-600"
            />
            {errors.email && (
              <span className="text-red-400 text-xs mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Number of Players */}
          <div className="flex flex-col col-span-full sm:col-span-2">
            <input
              type="number"
              placeholder="Number of Players (1-5)"
              {...register("playersInTeam", {
                required: "This field is required.",
                min: {
                  value: 1,
                  message: "Minimum 1 player required.",
                },
                max: {
                  value: 5,
                  message: "Maximum 5 players allowed.",
                },
                onChange: () => trigger("playersInTeam"),
              })}
              className="bg-[#111827] text-white px-4 py-3 rounded-md border border-gray-600"
            />
            {errors.playersInTeam && (
              <span className="text-red-400 text-xs mt-1">
                {errors.playersInTeam.message}
              </span>
            )}
          </div>

          {/* Dynamic Player Fields */}
          {validPlayerCount &&
            playerFields.map((_, index) => (
              <React.Fragment key={index}>
                {/* In-Game ID */}
                <div className="flex flex-col">
                  <input
                    placeholder={`Player ${index + 1} In-Game ID`}
                    {...register(`players.${index}.inGameId` as const, {
                      required: `Player ${index + 1} In-Game ID is required.`,
                    })}
                    className="bg-[#111827] text-white px-4 py-3 rounded-md border border-gray-600"
                  />
                  {errors.players?.[index]?.inGameId && (
                    <span className="text-red-400 text-xs mt-1">
                      {errors.players[index]?.inGameId?.message}
                    </span>
                  )}
                </div>

                {/* Rank */}
                <div className="flex flex-col">
                  <select
                    {...register(`players.${index}.rank` as const, {
                      required: `Player ${index + 1} rank is required.`,
                    })}
                    value={rank}
                    className="bg-[#111827] text-white px-4 py-3 rounded-md border border-gray-600"
                  >
                    <option value="">Select Rank</option>
                    {Object.keys(ValorantRank).map((key) => (
                      <option
                        key={key}
                        value={ValorantRank[key as keyof typeof ValorantRank]}
                      >
                        {ValorantRank[key as keyof typeof ValorantRank]}
                      </option>
                    ))}
                  </select>
                  {errors.players?.[index]?.rank && (
                    <span className="text-red-400 text-xs mt-1">
                      {errors.players[index]?.rank?.message}
                    </span>
                  )}
                </div>
              </React.Fragment>
            ))}

          {/* Agreement */}
          <div className="col-span-full flex items-start gap-2">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1"
            />
            <label className="text-gray-300">
              I agree to the tournament rules, fair play policy, and terms of
              participation.
            </label>
          </div>

          {/* Submit */}
          <div className="col-span-full mt-2">
            <button
              type="submit"
              disabled={!agreed || !validPlayerCount}
              className={`w-full text-white text-lg font-bold py-3 rounded-xl ${
                agreed && validPlayerCount
                  ? "bg-[#8B5CF6] hover:bg-[#6B21A8]"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TournamentRegistrationModal;
