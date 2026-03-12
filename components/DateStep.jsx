import { useBookingStore } from "@/store/bookingStore";

const DateStep = ({ minDate }) => {
  const selectedDate = useBookingStore((state) => state.selectedDate);
  const setSelectedDate = useBookingStore((state) => state.setSelectedDate);
  return (
    <section>
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
          2
        </span>
        Select Date
      </h3>

      <input
        type="date"
        min={minDate}
        className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
        onChange={(e) => setSelectedDate(e.target.value)} // Update state di parent
        value={selectedDate}
      />
    </section>
  );
};

export default DateStep;
