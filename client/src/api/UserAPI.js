import { useState, useEffect } from 'react';
import axios from 'axios';

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [detail,setDetail] = useState([]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get('/api/profile', {
            headers: { Authorization: token },
          });
          setDetail(res.data)
          //console.log(res.data)
          setIsLogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

        } catch (err) {
          alert(err.response.data.msg);
        }
      };

      getUser();
    }
  }, [token]);



  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    detail:[detail,setDetail], 
  };
}

export default UserAPI;
