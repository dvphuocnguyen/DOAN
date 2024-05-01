import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Trạng thái của người dùng

  const login = (userData) => {
    // Cập nhật thông tin người dùng khi đăng nhập thành công
    setUser(userData);
    console.log(user)
  };

  const logout = () => {
    // Xóa thông tin người dùng khi đăng xuất
    setUser(null);
  };

  useEffect(() => {
    console.log('aaa',user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Kiểm tra kiểu của props children
};

export const useAuth = () => useContext(AuthContext);
