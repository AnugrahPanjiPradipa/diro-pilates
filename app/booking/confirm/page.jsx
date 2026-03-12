"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import ConfirmationScreen from "../../../components/ConfirmationScreen";
import { useBookingStore } from "@/store/bookingStore";

export default function ConfirmPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { field, timeslots, fetchFields, fetchTimeslots, setIsBooking } =
    useBookingStore();

  // Ambil data dari query params
  const name = searchParams.get("name");
  const phone = searchParams.get("phone");
  const date = searchParams.get("date");
  const start = Number(searchParams.get("start"));
  const end = Number(searchParams.get("end"));
  const fieldId = Number(searchParams.get("fieldId"));

  useEffect(() => {
    fetchFields();
    fetchTimeslots();
  }, [fetchFields, fetchTimeslots]);

  const selectedField = field.find((c) => c.id === fieldId) || null;

  // Perhitungan harga
  const duration = end - start;
  const totalPrice = selectedField ? duration * selectedField.price : 0;

  // Time labels from API (e.g. "09:00 AM", "02:00 PM")
  const startLabel = timeslots.find((s) => s.value === start)?.label ?? "";
  const endLabel = timeslots.find((s) => s.value === end)?.label ?? "";

  const handleBooking = async () => {
    setIsBooking(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: `futsal-${Date.now()}`,
          grossAmount: totalPrice,
          customerName: name,
          customerPhone: phone,
          itemName: selectedField?.name,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.token)
        throw new Error(data.error || "Payment failed");

      window.snap.pay(data.token, {
        onSuccess: () => {
          setIsBooking(false);
          const successUrl = `/booking/success?name=${encodeURIComponent(name || "")}&phone=${encodeURIComponent(phone || "")}&date=${encodeURIComponent(date || "")}&start=${start}&end=${end}&fieldId=${fieldId}&fieldName=${encodeURIComponent(selectedField?.name || "")}&startLabel=${encodeURIComponent(startLabel || "")}&endLabel=${encodeURIComponent(endLabel || "")}`;
          router.replace(successUrl);
        },
        onPending: () => {
          setIsBooking(false);
          const successUrl = `/booking/success?name=${encodeURIComponent(name || "")}&phone=${encodeURIComponent(phone || "")}&date=${encodeURIComponent(date || "")}&start=${start}&end=${end}&fieldId=${fieldId}&fieldName=${encodeURIComponent(selectedField?.name || "")}&startLabel=${encodeURIComponent(startLabel || "")}&endLabel=${encodeURIComponent(endLabel || "")}`;
          router.replace(successUrl);
        },
        onError: () => {
          setIsBooking(false);
          alert("Payment failed.");
        },
      });
    } catch (err) {
      setIsBooking(false);
      alert(err.message || "Something went wrong.");
    }
  };

  if (!selectedField)
    return <div className="p-10 text-center">Memuat konfirmasi...</div>;

  return (
    <ConfirmationScreen
      startLabel={startLabel}
      endLabel={endLabel}
      selectedField={selectedField}
      duration={duration}
      pricePerHour={selectedField.price}
      totalPrice={totalPrice}
      handleBooking={handleBooking}
      setConfirmation={() => router.back()}
    />
  );
}
