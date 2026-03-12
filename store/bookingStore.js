import { create } from "zustand";
import { supabase } from "@/lib/supabase";

export const useBookingStore = create((set) => ({
  isLoading: false,
  error: null,

  field: [],
  timeslots: [],

  fetchFields: async () => {
    set({ isLoading: true });
    const { data, error } = await supabase
      .from("fields")
      .select("*")
      .order("id", { ascending: true });

    set({
      field: data || [],
      error,
      isLoading: false,
    });
  },

  fetchTimeslots: async () => {
    set({ isLoading: true });
    const { data, error } = await supabase.from("timeslots").select("*");

    set({
      timeslots: data || [],
      error,
      isLoading: false,
    });
  },


  name: "",
  phone: "",
  selectedDate: "",
  startTime: null,
  endTime: null,
  selectedField: null,
  isBooking: false,

  setName: (name) => set({ name }),
  setPhone: (phone) => set({ phone }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setStartTime: (time) => set({ startTime: time }),
  setEndTime: (time) => set({ endTime: time }),
  setSelectedField: (selectedfield) => set({ selectedField: selectedfield }),
  setField: (field) => set({ field }),
  setTimeslots: (timeslots) => set({ timeslots }),
  setIsBooking: (isBooking) => set({ isBooking }),
}));