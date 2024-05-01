import { createContext, useState, useEffect } from "react";
import UserAPI from "./api/UserAPI";
import PropTypes from "prop-types";

import axios from "axios";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const refreshToken = async () => {
        const res = await axios.get("/user/refresh_token");

        setToken(res?.data?.accesstoken);
        // console.log(res);

        setTimeout(() => {
          refreshToken();
        }, 10 * 60 * 1000);
      };
      refreshToken();
    }
  }, []);

  const state = {
    token: [token, setToken],
    userAPI: UserAPI(token),
  };
  DataProvider.propTypes = {
    children: PropTypes.node.isRequired, // Kiểm tra kiểu của props children
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
