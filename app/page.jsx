'use client';

import { useState } from 'react';
// Import komponen UI (Child Components)
import ConfirmationScreen from '../components/ConfirmationScreen';
import SuccessBookingScreen from '../components/SuccessBookingScreen';
import Header from '../components/Header';
import InformationStep from '../components/InformationStep';
import DateStep from '../components/DateStep';
import TimeStep from '../components/TimeStep';
import CourtStep from '../components/CourtStep';
import BookingButton from '../components/BookingButton';
import { COURTS, TIMESLOTS } from '../data/data';

export default function Home() {
  // --- STATE MANAGEMENT (Penyimpanan Data Sementara) ---
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  
  // Menggunakan null untuk angka supaya bisa cek 'sudah dipilih atau belum'
  const [startTime, setStartTime] = useState(null); 
  const [endTime, setEndTime] = useState(null);
  const [selectedCourt, setSelectedCourt] = useState(null);

  // State untuk mengatur tampilan halaman (View State)
  const [confirmation, setConfirmation] = useState(false); // Munculkan halaman review?
  const [isBooking, setIsBooking] = useState(false);       // Loading state saat bayar?
  const [bookingSuccess, setBookingSuccess] = useState(false); // Transaksi sukses?

  // Variabel bantu untuk perhitungan & tampilan
  const minDate = new Date().toISOString().split('T')[0]; // Ambil tanggal hari ini (YYYY-MM-DD)
  const duration = startTime && endTime ? endTime - startTime : 0; // Hitung selisih jam
  const pricePerHour = selectedCourt ? selectedCourt.price : 0;    // Ambil harga dari object court
  const totalPrice = duration * pricePerHour;                      // Total bayar

  // Mencari Label String (misal "09:00 AM") berdasarkan Value Angka (9)
  const startLabel = TIMESLOTS.find((slot) => slot.value === startTime)?.label;
  const endLabel = TIMESLOTS.find((slot) => slot.value === endTime)?.label;
  
  // Aksi saat tombol "Pay Now" ditekan
  const handleBooking = () => {
    setIsBooking(true); // Mulai loading spinner

    // Simulasi delay API 
    setTimeout(() => {
      setConfirmation(false); // Tutup layar konfirmasi
      setIsBooking(false);    // Matikan loading
      setBookingSuccess(true); // Tampilkan layar sukses
    }, 2000);
  };

  // Aksi membuka layar konfirmasi
  const handleConfirm = () => {
    setConfirmation(true);
  };

  // Reset semua data ke awal (untuk booking ulang)
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

  // --- CONDITIONAL RENDERING (Logika Tampilan) ---

  // Jika user sedang di tahap Konfirmasi
  if (confirmation) {
    return (
      <ConfirmationScreen
        // Kirim semua data (Props) yang dibutuhkan layar konfirmasi
        startTime={startTime}
        endTime={endTime}
        handleBooking={handleBooking}
        selectedCourt={selectedCourt}
        selectedDate={selectedDate}
        duration={duration}
        pricePerHour={pricePerHour}
        name={name}
        phone={phone}
        totalPrice={totalPrice}
        isBooking={isBooking}
        setConfirmation={setConfirmation}
        startLabel={startLabel}
        endLabel={endLabel}
      />
    );
  }

  // Jika user sudah Sukses Bayar
  if (bookingSuccess) {
    return (
      <SuccessBookingScreen
        name={name}
        phone={phone}
        selectedCourt={selectedCourt}
        selectedDate={selectedDate}
        startLabel={startLabel}
        endLabel={endLabel}
        resetForm={resetForm}
      />
    );
  }

  // Tampilan Utama (Formulir Langkah demi Langkah)
  return (
    <main className="min-h-screen bg-white pb-20">
      <Header />

      <div className="max-w-md mx-auto px-6 mt-8 space-y-8">
        {/* Step 1: Input Data Diri */}
        <InformationStep
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
        />

        {/* Step 2: Pilih Tanggal (Muncul hanya jika nama sudah diisi) */}
        {name && phone && (
          <DateStep
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            minDate={minDate}
          />
        )}

        {/* Step 3: Pilih Jam (Muncul hanya jika tanggal sudah dipilih) */}
        {selectedDate && (
          <TimeStep
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            duration={duration}
          />
        )}

        {/* Step 4: Pilih Lapangan (Muncul hanya jika jam selesai sudah dipilih) */}
        {endTime && (
          <CourtStep
            selectedCourt={selectedCourt}
            setSelectedCourt={setSelectedCourt}
            COURTS={COURTS}
          />
        )}

        {/* Tombol Eksekusi Terakhir */}
        <BookingButton
          name={name}
          phone={phone}
          selectedDate={selectedDate}
          endTime={endTime}
          selectedCourt={selectedCourt}
          isBooking={isBooking}
          handleConfirm={handleConfirm}
        />
      </div>
    </main>
  );
}