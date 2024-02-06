/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

/* eslint-disable no-unused-vars */
function Button({ formStatus, setFormStatus, type }) {
  const { currentSelectedDate } = useSelector((state) => state.calendar);

  const { formData } = useSelector((state) => state.form);
  const [prevMorninglSlot, setPrevMorningSlot] = useState(false);
  const [prevEveninglSlot, setPrevEveningSlot] = useState(false);

  useEffect(() => {
    const isPreviouslyMorningSlotBooked = formData.some(
      (entry) =>
        entry.currentSelectedDate &&
        entry.currentSelectedDate.year === currentSelectedDate.year &&
        entry.currentSelectedDate.month === currentSelectedDate.month &&
        entry.currentSelectedDate.date === currentSelectedDate.date &&
        entry.morningSlot
    );

    setPrevMorningSlot(isPreviouslyMorningSlotBooked);

    const isPreviouslyNoonSlotBooked = formData.some(
      (entry) =>
        entry.currentSelectedDate &&
        entry.currentSelectedDate.year === currentSelectedDate.year &&
        entry.currentSelectedDate.month === currentSelectedDate.month &&
        entry.currentSelectedDate.date === currentSelectedDate.date &&
        entry.eveningSlot
    );

    setPrevEveningSlot(isPreviouslyNoonSlotBooked);
  }, [currentSelectedDate, formData]);

  return (
    <div className="mt-5 sm sm:mt-0 sm:absolute sm:bottom-0 sm:left-[50%] sm:translate-x-[-50%] flex items-center justify-center">
      {type === "submit" ? (
        <button className="bg-black p-1 px-4  rounded-md text-slate-50 font-semibold text-[1rem]">
          Submit
        </button>
      ) : (
        <button
          className={`${
            currentSelectedDate ? `bg-black` : `bg-slate-400`
          }  p-2 w-[150px] rounded-md text-slate-50 font-semibold text-[1.1rem]`}
          onClick={() =>
            currentSelectedDate && (!prevMorninglSlot || !prevEveninglSlot)
              ? setFormStatus(!formStatus)
              : prevMorninglSlot && prevEveninglSlot
              ? alert(
                  "OOPS! all slot booked on this date\nPlease select another data 😋"
                )
              : alert("Please Select the Booking Date 😋")
          }
        >
          + Book a Slot
        </button>
      )}
    </div>
  );
}

export default Button;
