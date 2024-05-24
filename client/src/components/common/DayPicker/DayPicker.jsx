// DayPicker.jsx
import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { format, differenceInDays } from "date-fns";
import { useDays } from "./DayContext";

const DayPicker = () => {
  const { daysSelected, setDaysSelected } = useDays(); // Sử dụng context
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    setValue(newValue);
    console.log("newValue:", newValue);
    if (newValue.startDate && newValue.endDate) {
      const start = new Date(newValue.startDate);
      const end = new Date(newValue.endDate);
      const days = differenceInDays(end, start) + 1; // +1 to include both start and end date
      setDaysSelected(days);
    } else {
      setDaysSelected(0);
    }
  };
  console.log("daysSelected:", daysSelected);
  const today = format(new Date(), "yyyy-MM-dd");

  return (
    <>
      <div className="list_hotel_container">
        <div className="day_picker">
          <Datepicker
            value={value}
            onChange={handleValueChange}
            showShortcuts={true}
            minDate={today}
          />
        </div>
        <div className="days_selected">
          <p>Số ngày đã chọn: {daysSelected}</p>
        </div>
      </div>
    </>
  );
};

export default DayPicker;
