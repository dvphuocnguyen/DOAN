import React, { useState } from "react";
import { Dropdown, Menu } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import PropTypes from "prop-types";

const DropDown = ({ nameFilter, nameItems }) => {
  // State để lưu giá trị được chọn
  const [selectedValue, setSelectedValue] = useState("");

  const options = nameItems.map((item, i) => ({
    key: i,
    text: item.name,  // Đảm bảo là `item.name`, không phải `item.text` nếu bạn truyền `name` trong nameItems
    value: item.value,
  }));

  // Hàm để xử lý khi giá trị thay đổi
  const handleChange = (e, { value }) => {
    setSelectedValue(value);
    console.log(`${nameFilter}: ${value}`);
  };

  return (
    <Menu compact>
      <Dropdown
        className="text-black"
        text={selectedValue ? nameItems.find(item => item.value === selectedValue).name : nameFilter}
        fluid
        selection
        options={options}
        onChange={handleChange}  // Thêm prop onChange
      />
    </Menu>
  );
};

DropDown.propTypes = {
  nameFilter: PropTypes.string.isRequired,
  nameItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DropDown;
