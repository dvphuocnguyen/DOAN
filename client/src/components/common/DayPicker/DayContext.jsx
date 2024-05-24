// DaysContext.js
import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types'; // Import thư viện prop-types

const DaysContext = createContext();

export const useDays = () => {
  return useContext(DaysContext);
};

export const DaysProvider = ({ children }) => {
  const [daysSelected, setDaysSelected] = useState(0);
  return (
    <DaysContext.Provider value={{ daysSelected, setDaysSelected }}>
      {children}
    </DaysContext.Provider>
  );
};

// Thêm phần kiểm tra kiểu cho prop children
DaysProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
