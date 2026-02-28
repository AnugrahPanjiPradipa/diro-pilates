const BookingButton = ({
  name,
  phone,
  selectedDate,
  endTime,
  selectedCourt,
  isBooking,
  handleConfirm,
}) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4">
      <div className="max-w-md mx-auto">
        <button
          disabled={
            !name ||
            !phone ||
            !selectedDate ||
            !endTime ||
            !selectedCourt ||
            isBooking
          }
          onClick={handleConfirm}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${!name || !phone || !selectedDate || !endTime || !selectedCourt ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-black text-white shadow-lg hover:bg-gPray-800 active:scale-95"}`}
        >
          Reservation
        </button>
      </div>
    </div>
  );
};

export default BookingButton;
