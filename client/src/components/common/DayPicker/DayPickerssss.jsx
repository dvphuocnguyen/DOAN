import React from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { format } from "date-fns";
import useDateRange from "./useDateRange"; // Import custom hook

const DayPicker = () => {
  const { dateRange, daysSelected, handleDateChange } = useDateRange();
  const today = format(new Date(), "yyyy-MM-dd");

  return (
    <>
      <div className="list_hotel_container">
        <div className="day_picker">
          <Datepicker
            value={dateRange}
            onChange={handleDateChange}
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
