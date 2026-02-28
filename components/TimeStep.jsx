const TimeStep = ({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  duration,
  timeslots,
}) => {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
          3
        </span>
        Select Duration
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {/* 1. Dropdown JAM MULAI */}
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Start Time</label>
          <select
            className="w-full p-3 border border-gray-200 rounded-xl bg-white"
            onChange={(e) => {
              setStartTime(Number(e.target.value));
              setEndTime(null); // Reset jam selesai agar user memilih ulang validasi baru
            }}
            value={startTime || ""}
          >
            <option value="">START</option>
            {timeslots.map((slot) => (
              <option key={slot.value} value={slot.value}>
                {slot.label}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Dropdown JAM SELESAI */}
        <div>
          <label className="text-xs text-gray-500 mb-1 block">End Time</label>
          <select
            className="w-full p-3 border border-gray-200 rounded-xl bg-white disabled:bg-gray-100"
            disabled={!startTime} // Matikan input jika Jam Mulai belum dipilih
            onChange={(e) => setEndTime(Number(e.target.value))}
            value={endTime || ""}
          >
            <option value="">END</option>
            {/* Hanya tampilkan jam yang LEBIH BESAR dari Jam Mulai */}
            {timeslots
              .filter((t) => t.value > startTime)
              .map((slot) => (
                <option key={slot.value} value={slot.value}>
                  {slot.label}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Tampilan Info Durasi (Hanya muncul jika durasi valid/positif) */}
      {duration > 0 && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-xl flex justify-between items-center text-blue-900">
          <div>
            <p className="text-sm font-medium">Total Duration</p>
            <p className="text-xl font-bold">
              {duration} {duration === 1 ? "Hour" : "Hours"}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default TimeStep;
