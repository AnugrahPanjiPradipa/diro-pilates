"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import InformationStep from "../../components/InformationStep";
import DateStep from "../../components/DateStep";
import TimeStep from "../../components/TimeStep";
import FieldStep from "../../components/FieldStep";
import BookingButton from "../../components/BookingButton";
import { useBookingStore } from "@/store/bookingStore";

export default function BookingPage() {
  const router = useRouter();

  const name = useBookingStore((s) => s.name);
  const phone = useBookingStore((s) => s.phone);
  const selectedDate = useBookingStore((s) => s.selectedDate);
  const startTime = useBookingStore((s) => s.startTime);
  const endTime = useBookingStore((s) => s.endTime);
  const fetchFields = useBookingStore((s) => s.fetchFields);
  const fetchTimeslots = useBookingStore((s) => s.fetchTimeslots);

  useEffect(() => {
    fetchFields();
    fetchTimeslots();
  }, [fetchFields, fetchTimeslots]);

  const handleConfirm = () => {
    router.push("/booking/confirm");
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-24 font-sans">
      <div className="bg-white sticky top-0 z-30">
        <div className="h-1 w-full bg-emerald-500"></div>

        <div className="max-w-md mx-auto px-6 py-6 text-center border-b border-gray-100">
          <h1 className="text-xl font-extrabold text-gray-900 uppercase tracking-tighter">
            Booking Lapangan <span className="text-emerald-600">Minsoc</span>
          </h1>
          <p className="text-gray-400 text-[10px] mt-1 font-semibold uppercase tracking-widest">
            Reservasi Cepat & Mudah
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 mt-8 space-y-6">
        <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50">
          <InformationStep />
        </div>

        {name && phone && (
          <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <DateStep minDate={new Date().toISOString().split("T")[0]} />
          </div>
        )}

        {selectedDate && (
          <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <TimeStep
              duration={startTime && endTime ? endTime - startTime : 0}
            />
          </div>
        )}

        {endTime && (
          <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <FieldStep />
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-lg border-t border-gray-100 p-5 z-20">
          <div className="max-w-md mx-auto">
            <BookingButton handleConfirm={handleConfirm} />
          </div>
        </div>
      </div>
    </main>
  );
}
