"use client";
import { useRouter } from "next/navigation";

import SuccessBookingScreen from "../../../components/SuccessBookingScreen";

export default function SuccessPage() {
  const route = useRouter();

  const resetForm = () => {
    route.push("/booking");
  };

  return <SuccessBookingScreen resetForm={resetForm} />;
}
