import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getUserInfo } from "../constants";

function Header() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const fetchUserInfo = async () => {
    
      const { data } = await axios.get(getUserInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data) {
        setUser(data);
      }
    
  };

  useEffect(() => {
    setToken(localStorage.getItem('TOKEN'))
    if(token) {
       fetchUserInfo();
    }
    console.log('I am header')
  }, [token]);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/"> Goal Setter </Link>
      </div>

      <ul>
        {!token ? (
          <li>
            <Link to="/login">
              {" "}
              <FaSignInAlt /> Login{" "}
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                onClick={() => {
                  localStorage.removeItem("TOKEN");
                }}
              >
                {" "}
                <FaSignOutAlt /> Logout{" "}
              </Link>
            </li>

            {user !== null && (
              <li>
                <Link>
                  {" "}
                  <FaUser /> {user.name}{" "}
                </Link>
              </li>
            )}
          </>
        )}

        {!token && (
          <li>
            <Link to="/register">
              {" "}
              <FaUser /> Register{" "}
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
