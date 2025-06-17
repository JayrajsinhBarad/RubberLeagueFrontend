import Image from "next/image";

export default function Home() {
  return (
    <main className="relative h-screen w-full text-white">
      {/* Background Image */}
      <Image
        src="/valorant-bg.png" // Make sure this is in the public folder
        alt="Valorant Background"
        fill
        className="object-cover z-0"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl font-extrabold mb-4">
          Welcome to Valorant Tournaments
        </h1>
        <p className="text-MS max-w-2xl font-normal">
          Compete with the best players and win exciting rewards.
        </p>
      </div>
    </main>
  );
}