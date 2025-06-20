"use client";


import Image from "next/image";
import Link from "next/link";
import TournamentCard from "../components/TournamentCard";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <main className="relative h-screen w-full text-white">
        {/* Background Image */}
        <Image
          src="/img/valorant-bg.png"
          alt="Valorant Background"
          fill
          className="object-cover z-0"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#171C26]/0 to-[#171C26]" />

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-5xl font-extrabold mb-4 mt-[-20rem]">
            Welcome to Valorant Tournaments
          </h1>
          <p className="text-2xl max-w-2xl font-light">
            Compete with the best players and win exciting rewards.
          </p>
        </div>
      </main>

      {/* Tournament Card below hero */}
      <section id="tournaments" className="bg-[#0F111A] py-12 px-6">
        <h2 className="text-white text-2xl font-bold mb-4 ml-8">Tournaments</h2>
        <Link  href="./tournament-info" className="block w-fit">
          <TournamentCard />
        </Link>
      </section>

      {/* Dummy Content */}
      <section className="bg-[#0F111A] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            About Our Tournaments
          </h3>
          <p className="text-lg mb-4">
            We host exciting tournaments every month where players from across
            the country compete for glory. Stay tuned for the latest events,
            rewards, and updates.
          </p>
          <p className="text-lg">
            Whether youre a solo player or a team, theres a challenge for
            everyone. Prepare your squad and climb the leaderboard!
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}