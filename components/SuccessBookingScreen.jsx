const SuccessBookingScreen = ({
  name,
  phone,
  selectedDate,
  fieldName,
  startLabel,
  endLabel,
  resetForm,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md w-full border border-gray-100 relative overflow-hidden">
        {/* Hiasan Background (Opsional, biar manis) */}
        <div className="absolute top-0 left-0 w-full h-2 bg-emerald-600"></div>

        {/* 1. Icon Sukses dengan Animasi Pulse */}
        <div className="mx-auto flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mt-6 mb-6 animate-bounce">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>

        {/* 2. Pesan Utama */}
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          You&apos;re Booked!
        </h2>
        <p className="text-gray-500 mb-8">
          Thanks <span className="font-semibold text-gray-900">{name}</span>,
          your session is confirmed.
        </p>

        {/* 3. Ringkasan Tiket (Ticket Summary) */}
        <div className="bg-gray-50 rounded-2xl p-6 text-left border border-gray-100 mb-8 relative">
          {/* Lubang tiket kiri kanan (hiasan) */}
          <div className="absolute top-1/2 -left-3 w-6 h-6 bg-white rounded-full border-r border-gray-100"></div>
          <div className="absolute top-1/2 -right-3 w-6 h-6 bg-white rounded-full border-l border-gray-100"></div>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                Studio
              </p>
              <p className="font-bold text-gray-800 text-lg leading-tight">
                {fieldName}
              </p>
            </div>

            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Date
                </p>
                <p className="font-semibold text-gray-800">{selectedDate}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Time
                </p>
                <p className="font-semibold text-gray-800">
                  {startLabel} - {endLabel}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Footer Pesan */}
        <p className="text-xs text-gray-400 mb-6">
          A confirmation has been sent to your WhatsApp number <br />
          <span className="text-gray-600 font-medium">{phone}</span>
        </p>

        {/* 5. Tombol Kembali */}
        <button
          onClick={resetForm}
          className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg shadow-gray-200 active:scale-95"
        >
          Book Another Session
        </button>
      </div>
    </div>
  );
};

export default SuccessBookingScreen;
