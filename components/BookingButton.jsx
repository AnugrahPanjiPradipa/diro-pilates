import { useBookingStore } from "@/store/bookingStore";

const BookingButton = ({ handleConfirm }) => {
  const name = useBookingStore((state) => state.name);
  const phone = useBookingStore((state) => state.phone);
  const selectedDate = useBookingStore((state) => state.selectedDate);
  const endTime = useBookingStore((state) => state.endTime);
  const selectedField = useBookingStore((state) => state.selectedField);
  const isBooking = useBookingStore((state) => state.isBooking);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4">
      <div className="max-w-md mx-auto">
        <button
          disabled={
            !name ||
            !phone ||
            !selectedDate ||
            !endTime ||
            !selectedField ||
            isBooking
          }
          onClick={handleConfirm}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${!name || !phone || !selectedDate || !endTime || !selectedField ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-black text-white shadow-lg hover:bg-gPray-800 active:scale-95"}`}
        >
          Reservation
        </button>
      </div>
    </div>
  );
};

export default BookingButton;
