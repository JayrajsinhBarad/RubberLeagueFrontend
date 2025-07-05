import { RegistrationValues } from "@/components/TournamentRegitrationModal";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || "";

export async function getTournaments(): Promise<any> {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/tournament`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error: any) {
    console.error("Error while fetching tournaments:", error);
    throw { message: error.response?.data?.message || "Something went wrong" };
  }
}

export async function getTournamentById(id: string): Promise<any> {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/tournament/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error: any) {
    console.error("Error while fetching tournaments:", error);
    throw { message: error.response?.data?.message || "Something went wrong" };
  }
}

export async function registerToTournament(tournamentId: string, data: RegistrationValues): Promise<any> {
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
  } catch (error: any) {
    console.error("Error while registering to tournament:", error);
    throw { message: error.response?.data?.message || "Something went wrong" };
  }
}

