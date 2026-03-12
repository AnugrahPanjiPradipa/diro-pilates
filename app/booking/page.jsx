"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import InformationStep from "../../components/InformationStep";
import DateStep from "../../components/DateStep";
import TimeStep from "../../components/TimeStep";
import FieldStep from "../../components/FieldStep";
import BookingButton from "../../components/BookingButton";
import { useBookingStore } from "@/store/bookingStore";

export default function BookingPage() {
  const router = useRouter();
  const {
    name,
    phone,
    selectedDate,
    startTime,
    endTime,
    selectedField,
    fetchFields,
    fetchTimeslots,
  } = useBookingStore();

  useEffect(() => {
    fetchFields();
    fetchTimeslots();
  }, [fetchFields, fetchTimeslots]);

  const handleConfirm = () => {
    const query = new URLSearchParams({
      name,
      phone,
      date: selectedDate,
      start: startTime,
      end: endTime,
      fieldId: selectedField?.id,
    }).toString();

    router.push(`/booking/confirm?${query}`);
  };

  return (
    <main className="min-h-screen bg-white pb-20">
      <Header />
      <div className="max-w-md mx-auto px-6 mt-8 space-y-8">
        <InformationStep />
        {name && phone && (
          <DateStep minDate={new Date().toISOString().split("T")[0]} />
        )}
        {selectedDate && (
          <TimeStep duration={startTime && endTime ? endTime - startTime : 0} />
        )}
        {endTime && <FieldStep />}
        <BookingButton handleConfirm={handleConfirm} />
      </div>
    </main>
  );
}
