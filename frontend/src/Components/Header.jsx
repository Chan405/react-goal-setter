import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authActions";

function Header() {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">Goal Setter</div>

      <ul>
        {userData ? (
          <>
            <li>
              <Link to="/login" onClick={handleLogout}>
                {" "}
                <FaSignOutAlt /> Logout{" "}
              </Link>
            </li>

            <li>
              <Link> {userData?.name} </Link>
            </li>
          </>
        ) : (
          <>
            {" "}
            <li>
              <Link to="/login">
                {" "}
                <FaSignInAlt /> Login{" "}
              </Link>
            </li>
            <li>
              <Link to="/register">
                {" "}
                <FaUser /> Register{" "}
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
