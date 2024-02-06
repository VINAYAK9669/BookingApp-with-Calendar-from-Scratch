import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: [],
};

const calendarSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addFormDetails(state, action) {
      state.formData.push(action.payload);
    },
  },
});

export const { addFormDetails } = calendarSlice.actions;
export default calendarSlice.reducer;
