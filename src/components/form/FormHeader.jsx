/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";

function FormHeader() {
  const { currentSelectedDate } = useSelector((state) => state.calendar);

  const getDayName = (day) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    if (typeof day !== "number" || day < 0 || day > 6) {
      return "Invalid Day";
    }

    return daysOfWeek[day];
  };

  return (
    <div className="sm:fixed  top-0 flex flex-col items-center sm:mt-3 mb-2 border-b-4 border-black ">
      <h1 className="font-bold text-[2rem]">
        {currentSelectedDate ? currentSelectedDate.date : new Date().getDate()}
      </h1>
      <p>
        {currentSelectedDate
          ? getDayName(currentSelectedDate.day)
          : getDayName(new Date().getDay())}
      </p>
    </div>
  );
}

export default FormHeader;
