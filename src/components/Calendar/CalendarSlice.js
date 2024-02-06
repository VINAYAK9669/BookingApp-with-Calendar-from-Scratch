import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentMonth: {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  },
  currentSelectedDate: undefined,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCurrentMonth(state, action) {
      state.currentMonth = action.payload;
    },

    addSelectedCurrentDate(state, action) {
      state.currentSelectedDate = action.payload;
    },
    addFormDetails(state, action) {
      state.formData.push(action.payload);
    },
  },
});

export const { setCurrentMonth, addSelectedDate, addSelectedCurrentDate } =
  calendarSlice.actions;
export default calendarSlice.reducer;
