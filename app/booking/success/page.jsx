"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import SuccessBookingScreen from "../../../components/SuccessBookingScreen";
import { useBookingStore } from "@/store/bookingStore";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const name = searchParams.get("name") || "";
  const phone = searchParams.get("phone") || "";
  const date = searchParams.get("date") || "";
  const fieldName = searchParams.get("fieldName") || "";
  const start = Number(searchParams.get("start"));
  const end = Number(searchParams.get("end"));

  const { timeslots, fetchTimeslots } = useBookingStore();

  const startLabel = timeslots.find((s) => s.value === start)?.label ?? "";
  const endLabel = timeslots.find((s) => s.value === end)?.label ?? "";

  useEffect(() => {
    fetchTimeslots();
  }, [fetchTimeslots]);

  return (
    <SuccessBookingScreen
      name={name}
      phone={phone}
      selectedDate={date}
      fieldName={fieldName}
      startLabel={startLabel}
      endLabel={endLabel}
      resetForm={() => router.push("/booking")}
    />
  );
}
