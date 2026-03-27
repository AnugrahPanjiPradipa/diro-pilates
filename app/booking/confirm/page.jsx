"use client";

import { useRouter } from "next/navigation";
import ConfirmationScreen from "../../../components/ConfirmationScreen";
import { useBookingStore } from "@/store/bookingStore";

export default function ConfirmPage() {
  const router = useRouter();

  const { name, phone, selectedField, setIsBooking, getPrice } =
    useBookingStore();

  const handleBooking = async () => {
    setIsBooking(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: `${selectedField.name}-${Date.now()}`,
          grossAmount: getPrice(),
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
          router.push("/booking/success");
        },
        onPending: () => {
          setIsBooking(false);
          router.push("/booking/success");
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

  return (
    <ConfirmationScreen
      handleBooking={handleBooking}
      setConfirmation={() => router.back()}
    />
  );
}
