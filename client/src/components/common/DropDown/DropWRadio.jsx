import React, { useState } from "react";
import PropTypes from "prop-types"; // Đảm bảo đã nhập PropTypes

const DropWRadio = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value);
  };

  return (
    <>
      <button
        onClick={toggleDropdown}
        className="text-black bg-gray-300 font-lg text-sm h-10 w-full pl-4 text-center inline-flex items-center dark:rgba(0, 0, 0, 0.95);
        "
        type="button"
      >
        Dropdown Radio{" "}
        <svg
          className="ml-2 w-2.5 h-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <div
        className={`z-10 ${
          isOpen ? "" : "hidden"
        } w-full bg-white divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
      >
        <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200">
          {options.map((option, index) => (
            <li key={index}>
              <div className="flex items-center">
                <input
                  id={`radio-${index}`}
                  type="radio"
                  value={option.value}
                  name="default-radio"
                  checked={selectedRadio === option.value}
                  onChange={handleRadioChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor={`radio-${index}`}
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {option.name}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {selectedRadio && <p>Selected Radio Value: {selectedRadio}</p>}
    </>
  );
};

// Định nghĩa PropTypes cho component
DropWRadio.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DropWRadio;
