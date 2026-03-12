import { useBookingStore } from "@/store/bookingStore";

const InformationStep = () => {
  const name = useBookingStore((state) => state.name);
  const setName = useBookingStore((state) => state.setName);
  const phone = useBookingStore((state) => state.phone);
  const setPhone = useBookingStore((state) => state.setPhone);

  return (
    <section>
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
          1
        </span>
        Fill Your Information
      </h3>
      <div className="gap-2 flex flex-col">
        <input
          type="text"
          className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="number"
          className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Phone Number"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />
      </div>
    </section>
  );
};

export default InformationStep;
