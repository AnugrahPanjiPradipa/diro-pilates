import { PulseLoader } from "react-spinners";
import Image from "next/image";
import { useBookingStore } from "@/store/bookingStore";

const ConfirmationScreen = ({
  handleBooking,
  selectedField,
  duration,
  pricePerHour,
  totalPrice,
  setConfirmation,
  startLabel,
  endLabel,
}) => {
  const selectedDate = useBookingStore((state) => state.selectedDate);
  const name = useBookingStore((state) => state.name);
  const phone = useBookingStore((state) => state.phone);
  const isBooking = useBookingStore((state) => state.isBooking);

  return (
    <div className="min-h-screen bg-gray-50 pb-32 pt-8 px-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-6 text-center gap-2 flex flex-col">
          <h3 className="text-2xl font-bold text-gray-900">Review Booking</h3>
          <p className="text-sm text-gray-500">
            Please double check your details
          </p>
        </div>

        {/* TICKET CARD: Bungkus semuanya dalam satu kotak putih cantik */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Bagian Atas: Court Info */}
          <div className="p-6 border-b border-gray-100 flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-200 shadow-sm">
              <Image
                src={selectedField?.image}
                alt={selectedField?.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-bold text-lg text-gray-900">
                {selectedField?.name}
              </h4>
              <p className="text-sm text-gray-500">
                IDR {pricePerHour.toLocaleString()}/hour
              </p>
            </div>
          </div>

          {/* Bagian Tengah: Detail Booking */}
          <div className="p-6 space-y-4">
            {/* Row 1: Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Date
                </label>
                <p className="text-gray-900 font-medium">{selectedDate}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Time
                </label>
                <div className="text-gray-900 font-medium">
                  {startLabel} - {endLabel}
                </div>
                <div className="text-xs text-blue-600 font-medium mt-1">
                  ({duration} {duration === 1 ? "Hour" : "Hours"})
                </div>
              </div>
            </div>

            {/* Divider Garis Putus-putus */}
            <div className="border-t border-dashed border-gray-200 my-2"></div>

            {/* Row 2: Personal Info */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Guest Name</span>
                <span className="text-sm font-medium text-gray-900">
                  {name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Phone</span>
                <span className="text-sm font-medium text-gray-900">
                  {phone}
                </span>
              </div>
            </div>
          </div>

          {/* Bagian Bawah: Total Price */}
          <div className="bg-gray-900 p-6 flex justify-between items-center">
            <span className="text-gray-400 text-sm">Total Payment</span>
            <span className="text-2xl font-bold text-white">
              IDR {totalPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto flex gap-3">
          {/* Tombol Back (Opsional, biar UX lebih bagus) */}
          <button
            onClick={() => setConfirmation(false)}
            className="px-6 py-4 rounded-xl font-bold text-black bg-gray-100 hover:bg-gray-200 transition-all"
          >
            Back
          </button>

          {/* Tombol Confirm */}
          <button
            disabled={isBooking}
            onClick={handleBooking}
            className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all
              ${isBooking ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800 active:scale-95"}`}
          >
            {isBooking ? <PulseLoader /> : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
