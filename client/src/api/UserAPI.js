import { useState, useEffect } from "react";
import axios from "axios";

const UserAPI = (token) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState();
  const [users, setUsers] = useState([]);
  const [userID, setUserID] = useState("");
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("http://localhost:3001/api/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          // console.log("Response data111111:", res.data);
          // console.log("Response role :", res.data.data.role);

          // Kiểm tra kết quả trả về
          if (res.data) {
            setDetail(res.data);
            setUserID(res.data.data._id);
            setIsLogged(true);
          
            res?.data?.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
          }
        } catch (err) {
          console.error(
            "Error fetching user data:",
            err.response?.data?.msg || err.message
          );
        }
      };

      getUser();
    }
  }, [token]);

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    detail: [detail, setDetail],
    userID: [userID, setUserID],
    users: [users, setUsers],
  };
};

export default UserAPI;
