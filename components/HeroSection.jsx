import React from "react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden">
      {/* Background Image dengan Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1632300951015-42d7df909581?q=80&w=1925&auto=format&fit=crop"
          alt="Hero Image"
          fill
          priority
          className="object-cover"
        />
        {/* Overlay gradien agar teks lebih "pop" */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-20 flex flex-col gap-12">
        {/* Header Section */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white italic tracking-tighter uppercase leading-none">
            Mini soccer <br />
            <span className="text-amber-400">Arena</span>
          </h1>
          <h2 className="text-gray-200 text-lg md:text-xl max-w-lg leading-relaxed border-l-4 border-amber-400 pl-4">
            Anywhere, anytime—get ready to play,
            <br />
            book your favorite field in seconds!
          </h2>
        </div>

        {/* Booking Card (Glassmorphism) */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 flex flex-col md:flex-row gap-6 md:gap-2 w-full lg:max-w-3xl p-6 rounded-3xl md:rounded-full items-center justify-between shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4">
            <div className="flex flex-col">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Activity</span>
              <p className="text-white text-lg font-semibold tracking-tight">Rent A Field</p>
            </div>
            <div className="flex flex-col border-y md:border-y-0 md:border-x border-white/10 py-4 md:py-0 md:px-8">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Location</span>
              <p className="text-white text-lg font-semibold tracking-tight">Nganjuk</p>
            </div>
            <div className="flex flex-col">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Sport</span>
              <p className="text-white text-lg font-semibold tracking-tight">Mini Soccer</p>
            </div>
          </div>

          <Link
            href="/booking"
            className="bg-amber-400 hover:bg-white text-black transition-all duration-300 font-bold px-10 py-4 rounded-full text-center whitespace-nowrap shadow-lg hover:scale-105 active:scale-95 w-full md:w-auto"
          >
            BOOK NOW
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;