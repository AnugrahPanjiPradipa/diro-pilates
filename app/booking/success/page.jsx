"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SuccessBookingScreen from "../../../components/SuccessBookingScreen";

const BASE_URL = "https://daftar-lapangan.free.beeceptor.com";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get("name");
  const phone = searchParams.get("phone");
  const date = searchParams.get("date") || "";
  const start = Number(searchParams.get("start"));
  const end = Number(searchParams.get("end"));
  const fieldName = searchParams.get("fieldName") || "";

  const [timeslots, setTimeslots] = useState([]);

  const startLabel = timeslots.find((s) => s.value === start)?.label ?? "";
  const endLabel = timeslots.find((s) => s.value === end)?.label ?? "";

  useEffect(() => {
    fetch(`${BASE_URL}/timeslot`)
      .then((res) => res.json())
      .then((data) => {
        setTimeslots(data);
      });
  }, [start, end]);

  return (
    <SuccessBookingScreen
      name={name}
      phone={phone}
      selectedDate={date}
      startLabel={startLabel}
      endLabel={endLabel}
      selectedCourt={fieldName ? { name: fieldName } : null}
      resetForm={() => router.push("/booking")}
    />
  );
}
