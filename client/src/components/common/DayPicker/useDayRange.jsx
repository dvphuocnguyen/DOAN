import { useState } from "react";
import { differenceInDays } from "date-fns";

const useDateRange = () => {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [daysSelected, setDaysSelected] = useState(0);

  const handleDateChange = (newRange) => {
    setDateRange(newRange);

    if (newRange.startDate && newRange.endDate) {
      const start = new Date(newRange.startDate);
      const end = new Date(newRange.endDate);
      const days = differenceInDays(end, start) + 1; // +1 để bao gồm cả ngày bắt đầu và kết thúc
      setDaysSelected(days);
    } else {
      setDaysSelected(0);
    }
  };

  return { dateRange, daysSelected, handleDateChange };
};

export default useDateRange;
