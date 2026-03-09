"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ConfirmationScreen from "../../../components/ConfirmationScreen";

export default function ConfirmPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [field, setField] = useState(null);
  const [timeslots, setTimeslots] = useState([]);
  const [isBooking, setIsBooking] = useState(false);

  // Ambil data dari query params
  const name = searchParams.get("name");
  const phone = searchParams.get("phone");
  const date = searchParams.get("date");
  const start = Number(searchParams.get("start"));
  const end = Number(searchParams.get("end"));
  const fieldId = Number(searchParams.get("fieldId"));

  // Perhitungan harga
  const duration = end - start;
  const totalPrice = field ? duration * field.price : 0;

  // Time labels from API (e.g. "09:00 AM", "02:00 PM")
  const startLabel = timeslots.find((s) => s.value === start)?.label ?? "";
  const endLabel = timeslots.find((s) => s.value === end)?.label ?? "";

  const BASE_URL = "https://daftar-lapangan.free.beeceptor.com";

  useEffect(() => {
    fetch(`${BASE_URL}/field`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((c) => c.id === fieldId);
        setField(found);
      });
    fetch(`${BASE_URL}/timeslot`)
      .then((res) => res.json())
      .then((data) => {
        setTimeslots(data);
      });
  }, [fieldId]);

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
          itemName: field?.name,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.token)
        throw new Error(data.error || "Payment failed");

      window.snap.pay(data.token, {
        onSuccess: () => {
          setIsBooking(false);
          const successUrl = `/booking/success?name=${encodeURIComponent(name || "")}&phone=${encodeURIComponent(phone || "")}&date=${encodeURIComponent(date || "")}&start=${start}&end=${end}&fieldId=${fieldId}&fieldName=${encodeURIComponent(field?.name || "")}&startLabel=${encodeURIComponent(startLabel || "")}&endLabel=${encodeURIComponent(endLabel || "")}`;
          router.push(successUrl);
        },
        onPending: () => {
          setIsBooking(false);
          const successUrl = `/booking/success?name=${encodeURIComponent(name || "")}&phone=${encodeURIComponent(phone || "")}&date=${encodeURIComponent(date || "")}&start=${start}&end=${end}&fieldId=${fieldId}&fieldName=${encodeURIComponent(field?.name || "")}&startLabel=${encodeURIComponent(startLabel || "")}&endLabel=${encodeURIComponent(endLabel || "")}`;
          router.push(successUrl);
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

  if (!field)
    return <div className="p-10 text-center">Memuat konfirmasi...</div>;

  return (
    <ConfirmationScreen
      name={name}
      phone={phone}
      selectedDate={date || ""}
      startLabel={startLabel}
      endLabel={endLabel}
      selectedCourt={field}
      duration={duration}
      pricePerHour={field.price}
      totalPrice={totalPrice}
      handleBooking={handleBooking}
      isBooking={isBooking}
      setConfirmation={() => router.back()}
    />
  );
}
