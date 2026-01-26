'use client';

import { useState } from 'react';

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
  const startLabel = TIMESLOTS.find((slot) => slot.value === startTime)?.label;
  const endLabel = TIMESLOTS.find((slot) => slot.value === endTime)?.label;

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
    return (
      <ConfirmationScreen
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

  // Tampilan kalau SUKSES booking
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

  // Tampilan UTAMA
  return (
    <main className="min-h-screen bg-white pb-20">
      {/* Header Sederhana */}
      <Header />

      <div className="max-w-md mx-auto px-6 mt-8 space-y-8">
        <InformationStep
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
        />

        {name && phone && (
          <DateStep
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            minDate={minDate}
          />
        )}

        {/* 2. Bagian Pilih Jam (Range) */}
        {selectedDate && (
          <TimeStep
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            duration={duration}
          />
        )}

        {/* 3. Bagian Pilih Court (Muncul cuma kalau jam sudah dipilih) */}
        {endTime && (
          <CourtStep
            selectedCourt={selectedCourt}
            setSelectedCourt={setSelectedCourt}
            COURTS={COURTS}
          />
        )}

        {/* 4. Tombol Booking (Muncul kalau semua lengkap) */}
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
