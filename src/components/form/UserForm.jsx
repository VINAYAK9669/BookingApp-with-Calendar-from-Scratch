/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFormDetails } from "./FormSlice";
import Button from "../utils/Button";

function UserForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState("");
  const [formStatus, setFormStatus] = useState(false);
  const [morningSlot, setMorningSlot] = useState(false);
  const [eveningSlot, setEveningSlot] = useState(false);
  const [prevMorninglSlot, setPrevMorningSlot] = useState(false);
  const [prevEveninglSlot, setPrevEveningSlot] = useState(false);

  const dispatch = useDispatch();
  const { currentSelectedDate } = useSelector((state) => state.calendar);

  const { formData } = useSelector((state) => state.form);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (morningSlot === false && eveningSlot === false) {
      alert("Select the Slot");
      return;
    }

    const formData = {
      name,
      phone,
      email,
      purpose,
      morningSlot: prevMorninglSlot ? false : morningSlot,
      eveningSlot: prevEveninglSlot ? false : eveningSlot,
      currentSelectedDate,
    };

    const isConfirmed = window.confirm(
      `Form submitted:\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nPurpose: ${purpose}\nSlot- ${
        morningSlot && prevMorninglSlot !== morningSlot ? "Morning Slot" : ""
      } ${
        eveningSlot && prevEveninglSlot !== eveningSlot ? "Evening Slot" : ""
      }\n
      \nDo you want to confirm?`
    );

    if (isConfirmed) {
      dispatch(addFormDetails(formData));
      alert("Booked 😍");
      setName("");
      setPhone("");
      setEmail("");
      setPurpose("");
      setFormStatus(false);
    }
  };

  useEffect(() => {
    const isPreviouslyMorningSlotBooked = formData.some(
      (entry) =>
        entry.currentSelectedDate &&
        entry.currentSelectedDate.year === currentSelectedDate.year &&
        entry.currentSelectedDate.month === currentSelectedDate.month &&
        entry.currentSelectedDate.date === currentSelectedDate.date &&
        entry.morningSlot &&
        morningSlot
    );

    setPrevMorningSlot(isPreviouslyMorningSlotBooked);

    const isPreviouslyNoonSlotBooked = formData.some(
      (entry) =>
        entry.currentSelectedDate &&
        entry.currentSelectedDate.year === currentSelectedDate.year &&
        entry.currentSelectedDate.month === currentSelectedDate.month &&
        entry.currentSelectedDate.date === currentSelectedDate.date &&
        entry.eveningSlot &&
        eveningSlot
    );

    setPrevEveningSlot(isPreviouslyNoonSlotBooked);
  }, [currentSelectedDate, formData, morningSlot, eveningSlot]);

  return (
    <div className=" sm:min-w-[200px] flex justify-center items-center mt-8 mb-4">
      {formStatus ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
          <div>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
              required
              className="pl-4 pr-2 py-1 rounded-lg border-l-2 border-black  outline-none"
            />
          </div>
          <div>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Your Phone"
              required
              className="pl-4 pr-2 py-1 rounded-lg border-l-2 border-black  outline-none"
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              required
              className="pl-4 pr-2 py-1 rounded-lg border-l-2 border-black  outline-none"
            />
          </div>
          <div>
            <input
              type="text"
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Purpose of Booking"
              required
              className="pl-4 pr-2 py-1 rounded-lg border-l-2 border-black  outline-none"
            />
          </div>
          <div>
            <p className="font-semibold mt-2">Select Slot</p>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="morningSlot"
                checked={morningSlot}
                onChange={() =>
                  !prevMorninglSlot ? setMorningSlot(!morningSlot) : ""
                }
                className="accent-black"
              />
              <label htmlFor="morningSlot">
                {prevMorninglSlot ? "Morning Slot Booked" : "Morning Slot"}
              </label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="eveningSlot"
                checked={eveningSlot}
                onChange={() =>
                  !prevEveninglSlot ? setEveningSlot(!eveningSlot) : ""
                }
                className="accent-black"
              />
              <label htmlFor="eveningSlot">
                {prevEveninglSlot ? "Noon slot booked" : "Noon Slot"}
              </label>
            </div>
          </div>
          <Button
            formStatus={formStatus}
            setFormStatus={setFormStatus}
            type="submit"
            onClick={handleSubmit}
          />
        </form>
      ) : (
        <div>
          <div>
            <p className="text-center">Select a date and Start Booking 😍</p>
          </div>
          <Button formStatus={formStatus} setFormStatus={setFormStatus} />
        </div>
      )}
    </div>
  );
}

export default UserForm;
