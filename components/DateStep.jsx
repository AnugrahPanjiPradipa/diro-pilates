const DateStep = ({ selectedDate, setSelectedDate, minDate }) => {
  return (
    <section>
      {/* Judul Step */}
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
        Select Date
      </h3>

      <input
        type="date"
        min={minDate} // [PENTING] Validasi HTML5: Disable tanggal sebelum hari ini
        className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
        onChange={(e) => setSelectedDate(e.target.value)} // Update state di parent
        value={selectedDate}
      />
    </section>
  );
};

export default DateStep;
