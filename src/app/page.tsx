import Image from "next/image";
import TournamentCard from "../components/TournamentCard";

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
      <section className="bg-[#0F111A] py-12 px-6">
        <h2 className="text-white text-2xl font-bold mb-4 ml-8">Tournaments</h2>
        <TournamentCard />
      </section>
    </>
  );
}
