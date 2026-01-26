'use client';

import { useState } from 'react';
import Image from 'next/image';
import { COURTS, TIMESLOTS } from '../data/data';
import { PulseLoader } from 'react-spinners';

export default function Home() {
  // State untuk menyimpan pilihan user
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [confirmation, setConfirmation] = useState(false);

  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const minDate = new Date().toISOString().split('T')[0];
  const duration = startTime && endTime ? endTime - startTime : 0;
  const pricePerHour = selectedCourt ? selectedCourt.price : 0;
  const totalPrice = duration * pricePerHour;

  // Fungsi saat tombol "Book Now" ditekan
  const handleBooking = () => {
    // Simulasi loading payment gateway (Bonus Point: UI saja)
    setIsBooking(true);

    setTimeout(() => {
      setConfirmation(false);
      setIsBooking(false);
      setBookingSuccess(true);
    }, 2000);
  };

  const handleConfirm = () => {
    setConfirmation(true);
  };

  // Reset form untuk reservasi baru
  const resetForm = () => {
    setName('');
    setPhone('');
    setSelectedDate('');
    setEndTime(null);
    setStartTime(null);
    setSelectedCourt(null);
    setBookingSuccess(false);
    setConfirmation(false);
    setIsBooking(false);
  };

  if (confirmation) {
    // 1. Logic mencari label jam (seperti request sebelumnya)
    const startLabel = TIMESLOTS.find((slot) => slot.value === startTime)?.label;
    const endLabel = TIMESLOTS.find((slot) => slot.value === endTime)?.label;

    return (
      <div className="min-h-screen bg-gray-50 pb-32 pt-8 px-6">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="mb-6 text-center gap-2 flex flex-col">
            <h3 className="text-2xl font-bold text-gray-900">Review Booking</h3>
            <p className="text-sm text-gray-500">Please double check your details</p>
          </div>

          {/* TICKET CARD: Bungkus semuanya dalam satu kotak putih cantik */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Bagian Atas: Court Info */}
            <div className="p-6 border-b border-gray-100 flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-200 shadow-sm">
                <Image
                  src={selectedCourt?.image}
                  alt={selectedCourt?.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-900">{selectedCourt?.name}</h4>
                <p className="text-sm text-gray-500">IDR {pricePerHour.toLocaleString()}/hour</p>
              </div>
            </div>

            {/* Bagian Tengah: Detail Booking */}
            <div className="p-6 space-y-4">
              {/* Row 1: Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</label>
                  <p className="text-gray-900 font-medium">{selectedDate}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Time</label>
                  <div className="text-gray-900 font-medium">
                    {startLabel} - {endLabel}
                  </div>
                  <div className="text-xs text-blue-600 font-medium mt-1">
                    ({duration} {duration === 1 ? 'Hour' : 'Hours'})
                  </div>
                </div>
              </div>

              {/* Divider Garis Putus-putus */}
              <div className="border-t border-dashed border-gray-200 my-2"></div>

              {/* Row 2: Personal Info */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Guest Name</span>
                  <span className="text-sm font-medium text-gray-900">{name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Phone</span>
                  <span className="text-sm font-medium text-gray-900">{phone}</span>
                </div>
              </div>
            </div>

            {/* Bagian Bawah: Total Price */}
            <div className="bg-gray-900 p-6 flex justify-between items-center">
              <span className="text-gray-400 text-sm">Total Payment</span>
              <span className="text-2xl font-bold text-white">IDR {totalPrice.toLocaleString()}</span>
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
              className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all shadow-lg
              ${isBooking ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800 active:scale-95'}`}
            >
              {isBooking ? <PulseLoader /> : 'Pay Now'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Tampilan kalau SUKSES booking
  if (bookingSuccess) {
    // Cari label jam lagi untuk tampilan (karena startTime cuma angka)
    const startLabel = TIMESLOTS.find((slot) => slot.value === startTime)?.label;
    const endLabel = TIMESLOTS.find((slot) => slot.value === endTime)?.label;

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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">You're Booked!</h2>
          <p className="text-gray-500 mb-8">
            Thanks <span className="font-semibold text-gray-900">{name}</span>, your session is confirmed.
          </p>

          {/* 3. Ringkasan Tiket (Ticket Summary) */}
          <div className="bg-gray-50 rounded-2xl p-6 text-left border border-gray-100 mb-8 relative">
            {/* Lubang tiket kiri kanan (hiasan) */}
            <div className="absolute top-1/2 -left-3 w-6 h-6 bg-white rounded-full border-r border-gray-100"></div>
            <div className="absolute top-1/2 -right-3 w-6 h-6 bg-white rounded-full border-l border-gray-100"></div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Studio</p>
                <p className="font-bold text-gray-800 text-lg leading-tight">{selectedCourt?.name}</p>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Date</p>
                  <p className="font-semibold text-gray-800">{selectedDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Time</p>
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
  }

  // Tampilan UTAMA
  return (
    <main className="min-h-screen bg-white pb-20">
      {/* Header Sederhana */}
      <header className="px-6 py-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold">DIRO Pilates.</h1>
        <p className="text-gray-400 text-sm">Find your balance today.</p>
      </header>

      <div className="max-w-md mx-auto px-6 mt-8 space-y-8">
        <section>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
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

        {name && phone && (
          <section>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
              Select Date
            </h3>
            <input
              type="date"
              min={minDate}
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              onChange={(e) => setSelectedDate(e.target.value)}
              value={selectedDate}
            />
          </section>
        )}

        {/* 2. Bagian Pilih Jam (Range) */}
        {selectedDate && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
              Select Duration
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {/* Dropdown Mulai */}
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Start Time</label>
                <select
                  className="w-full p-3 border border-gray-200 rounded-xl bg-white"
                  onChange={(e) => {
                    setStartTime(Number(e.target.value));
                    setEndTime(null);
                  }}
                  value={startTime || ''}
                >
                  <option value="">START</option>
                  {TIMESLOTS.map((slot) => (
                    <option
                      key={slot.value}
                      value={slot.value}
                    >
                      {slot.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dropdown Selesai */}
              <div>
                <label className="text-xs text-gray-500 mb-1 block">End Time</label>
                <select
                  className="w-full p-3 border border-gray-200 rounded-xl bg-white disabled:bg-gray-100"
                  disabled={!startTime}
                  onChange={(e) => setEndTime(Number(e.target.value))}
                  value={endTime || ''}
                >
                  <option value="">END</option>
                  {TIMESLOTS.filter((t) => t.value > startTime).map((slot) => (
                    <option
                      key={slot.value}
                      value={slot.value}
                    >
                      {slot.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tampilan Total Jam & Harga (Muncul kalau sudah valid) */}
            {duration > 0 && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-xl flex justify-between items-center text-blue-900">
                <div>
                  <p className="text-sm font-medium">Total Duration</p>
                  <p className="text-xl font-bold">
                    {duration} {duration === 1 ? 'Hour' : 'Hours'}
                  </p>
                </div>
              </div>
            )}
          </section>
        )}

        {/* 3. Bagian Pilih Court (Muncul cuma kalau jam sudah dipilih) */}
        {endTime && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">4</span>
              Select Court
            </h3>
            <div className="space-y-4">
              {COURTS.map((courtItem) => (
                <div
                  key={courtItem.id}
                  onClick={() => setSelectedCourt(courtItem)}
                  className={`flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition-all
                    ${selectedCourt?.id === courtItem.id ? 'border-black ring-1 ring-black bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}
                >
                  {/* Gambar Court */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                    <Image
                      src={courtItem.image}
                      alt={courtItem.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-gray-900">{courtItem.name}</h4>
                      <span className="text-xs font-bold text-black bg-gray-100 px-2 py-1 rounded-full">IDR {courtItem.price.toLocaleString()}/hr</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{courtItem.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. Tombol Booking (Muncul kalau semua lengkap) */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4">
          <div className="max-w-md mx-auto">
            <button
              disabled={!name || !phone || !selectedDate || !endTime || !selectedCourt || isBooking}
              onClick={handleConfirm}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all
                ${!name || !phone || !selectedDate || !endTime || !selectedCourt ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-black text-white shadow-lg hover:bg-gray-800 active:scale-95'}`}
            >
              Reservation
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
