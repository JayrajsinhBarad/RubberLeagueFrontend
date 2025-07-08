import { RegistrationValues } from "@/components/TournamentRegitrationModal";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || "";

export type Tournament = {
  id: string;
  name: string;
  date: string;
  // Add other fields as per your API response
};

export async function getTournaments(): Promise<Tournament[]> {
  try {
    const { data } = await axios.get<Tournament[]>(`${BASE_URL}/api/tournament`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error: unknown) {
    console.error("Error while fetching tournaments:", error);
    if (axios.isAxiosError(error)) {
      throw { message: error.response?.data?.message || "Something went wrong" };
    }
    throw { message: "Something went wrong" };
  }
}

export async function getTournamentById(id: string): Promise<Tournament> {
  try {
    const { data } = await axios.get<Tournament>(`${BASE_URL}/api/tournament/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error: unknown) {
    console.error("Error while fetching tournaments:", error);
    if (axios.isAxiosError(error)) {
      throw { message: error.response?.data?.message || "Something went wrong" };
    }
    throw { message: "Something went wrong" };
  }
}

export async function registerToTournament(tournamentId: string, data: RegistrationValues): Promise<void> {
  try {
    await axios.post(
      `${BASE_URL}/api/team`,
      {
        tournamentId,
        ...data,
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
  } catch (error: unknown) {
    console.error("Error while registering to tournament:", error);
    if (axios.isAxiosError(error)) {
      throw { message: error.response?.data?.message || "Something went wrong" };
    }
    throw { message: "Something went wrong" };
  }
}

