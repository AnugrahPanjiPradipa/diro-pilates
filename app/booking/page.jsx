"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import InformationStep from "../../components/InformationStep";
import DateStep from "../../components/DateStep";
import TimeStep from "../../components/TimeStep";
import CourtStep from "../../components/FieldStep";
import BookingButton from "../../components/BookingButton";

export default function BookingPage() {
  const router = useRouter();
  const [field, setField] = useState([]);
  const [timeslots, setTimeslots] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [selectedField, setSelectedField] = useState(null);

  const BASE_URL = "https://daftar-lapangan.free.beeceptor.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resField = await fetch(`${BASE_URL}/field`);
        setField(await resField.json());
        const resTime = await fetch(`${BASE_URL}/timeslot`);
        setTimeslots(await resTime.json());
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };
    fetchData();
  }, []);

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
        <InformationStep
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
        />
        {name && phone && (
          <DateStep
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            minDate={new Date().toISOString().split("T")[0]}
          />
        )}
        {selectedDate && (
          <TimeStep
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            duration={startTime && endTime ? endTime - startTime : 0}
            timeslots={timeslots}
          />
        )}
        {endTime && (
          <CourtStep
            selectedField={selectedField}
            setSelectedField={setSelectedField}
            field={field}
          />
        )}
        <BookingButton
          name={name}
          phone={phone}
          selectedDate={selectedDate}
          endTime={endTime}
          selectedField={selectedField}
          handleConfirm={handleConfirm}
        />
      </div>
    </main>
  );
}
