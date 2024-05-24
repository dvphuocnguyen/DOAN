import React, { createContext, useState, useEffect } from "react";
import UserAPI from "../api/UserAPI";
import PropTypes from "prop-types";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    const storedAccessToken = localStorage.getItem("accesstoken");
    console.log(storedAccessToken, "tesst access");

    if (firstLogin && storedAccessToken) {
      const refreshToken = async () => {
        try {
          // Gọi API refresh token nếu cần thiết
          // const res = await axios.get(`${API_URL}/user/refresh_token`);
          // setToken(res.data.accesstoken);
          setToken(storedAccessToken);

          setTimeout(() => {
            refreshToken();
          }, 10 * 60 * 1000); // Làm mới token mỗi 10 phút
        } catch (error) {
          console.log(error);
        }
      };
      refreshToken();
    }
  }, []); // Chỉ chạy một lần khi mount

  // useEffect(() => {
  //   console.log("Token đã được cập nhật:", token); // Log kiểm tra token
  // }, [token]);

  const state = {
    token: [token, setToken],
    UserAPI: UserAPI(token),
  };

  // useEffect(() => {
  //   console.log("UserAPI:", state.UserAPI); // Log kiểm tra UserAPI
  // }, [state.UserAPI]);

  DataProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
