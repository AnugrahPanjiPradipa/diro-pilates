import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { persist, createJSONStorage } from "zustand/middleware";

export const useBookingStore = create(persist(
  (set, get) => ({
    isLoading: false,
    error: null,
  
    field: [],
    timeslots: [],
  
    fetchFields: async () => {
      const { field } = get();
      if (field.length > 0) return; 
    
      set({ isLoading: true });
      const { data, error } = await supabase
        .from("fields")
        .select("*")
        .order("id", { ascending: true });
    
      set({ field: data || [], error, isLoading: false });
    },
    
    fetchTimeslots: async () => {
      const { timeslots } = get();
      if (timeslots.length > 0) return; 
    
      set({ isLoading: true });
      const { data, error } = await supabase.from("timeslots").select("*");
    
      set({ timeslots: data || [], error, isLoading: false });
    },
  
    getDuration: () => {
      const { startTime, endTime } = get();
      if (!startTime || !endTime) return 0;
      return endTime - startTime;
    },
  
    getPrice: () => {
      const { selectedField } = get();
      const duration = get().getDuration();
      if (!selectedField || !duration) return 0;
      return selectedField.price * duration;
    },
  
    getStartLabel: () => {
      const { timeslots, startTime } = get();
      return timeslots.find((t) => t.value === startTime)?.label ?? "";
    },
  
    getEndLabel: () => {
      const { timeslots, endTime } = get();
      return timeslots.find((t) => t.value === endTime)?.label ?? "";
    },
  
    getPricePerHour: () => {
      const { selectedField } = get();
      if(!selectedField) return 0;
      return selectedField.price;
    },

    resetForm: () =>
      set({
        name: "",
        phone: "",
        selectedDate: "",
        startTime: null,
        endTime: null,
        selectedField: null,
        isBooking: false,
      }),
  
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
  }),
  
  {
    name: "booking-storage",
    storage: createJSONStorage(() => sessionStorage), // Data hilang saat tab ditutup
  }
));