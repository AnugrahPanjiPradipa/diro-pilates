import React from "react";

import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section>
      <Image
        src="https://images.unsplash.com/photo-1632300951015-42d7df909581?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Hero Image"
        fill
        className="object-center"
      />
      <div className="relative flex flex-col justify-between py-10 px-10 gap-20">
        <h1 className="text-9xl font-extrabold py-4 text-white italic sporty tracking-tight">
          Mini soccer <br />
          Arena
        </h1>

        <h2 className="text-white text-lg font-medium">
          Anywhere, anytime-get ready to play,
          <br />
          book your favorite field in seconds!
        </h2>

        <div className="bg-white/20 backdrop-blur-xs flex flex-row gap-2 max-w-1/2 p-3 rounded-tr-2xl rounded-bl-2xl justify-between">
          <div className="flex flex-col">
            <p className="text-amber-100 text-xs">Activity</p>
            <p className="text-white text-lg">Rent A Field</p>
          </div>
          <div className="flex flex-col">
            <p className="text-amber-100 text-xs">Location</p>
            <p className="text-white text-lg">Nganjuk</p>
          </div>
          <div className="flex flex-col">
            <p className="text-amber-100 text-xs">Sport</p>
            <p className="text-white text-lg">Mini Soccer</p>
          </div>
          <Link
            href="/booking"
            className="bg-black text-white px-6 py-3 rounded-tr-2xl rounded-bl-2xl"
          >
            Book
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
