import React, { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import axios from "axios";
import { login } from "../constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authActions";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(login, { email, password });
      if (data.user) {
        localStorage.setItem("userData", JSON.stringify(data.user));
        dispatch(loginSuccess(data.user));
        navigate("/");
      }
    } catch (e) {
      if (e.response && e.response.data && e.response.data.message) {
        setError(e.response.data.message);
      }
      console.log(e);
    }
  };

  const disabled = email.length === 0 || password.length === 0;

  return (
    <>
      <section>
        <h1>
          {" "}
          <FaSignInAlt />
          Login{" "}
        </h1>
      </section>
      {error && <h3 className="error-msg"> {error}</h3>}

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="email"
              id="email"
              className="form-control"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button
              type="submit"
              className={disabled ? "btn-disabled  btn-block" : "btn btn-block"}
              disabled={disabled}
            >
              {" "}
              Submit{" "}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default LoginForm;
