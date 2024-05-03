import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Trạng thái của người dùng

  const login = (userData) => {
    // Cập nhật thông tin người dùng khi đăng nhập thành công
    setUser(userData);
    console.log(user);
    console.log("authcontext", userData);
  };

  const logout = () => {
    // Xóa thông tin người dùng khi đăng xuất
    setUser(null);
  };

  const register = (userData) => {
    // Xử lý quá trình đăng ký người dùng mới
    // Ví dụ: lưu thông tin người dùng vào cơ sở dữ liệu
    // Sau khi đăng ký thành công, có thể tự động đăng nhập người dùng
    login(userData);
  };

  useEffect(() => {
    console.log("aaa context", user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Kiểm tra kiểu của props children
};

export const useAuth = () => useContext(AuthContext);
