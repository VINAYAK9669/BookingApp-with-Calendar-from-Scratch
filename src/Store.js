import { configureStore } from "@reduxjs/toolkit";

import calendarReducer from "./components/Calendar/CalendarSlice";
import formReducer from "./components/form/FormSlice";

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    form: formReducer,
  },
});
export default store;
