import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { register } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(register, { name, email, password });
      if (data.user) {
        navigate("/login");
      }
    } catch (e) {
      if (e.response && e.response.data && e.response.data.message) {
        setError(e.response.data.message);
      }
      console.log(e);
    }
  };

  const disabled =
    name.length === 0 ||
    email.length === 0 ||
    password.length === 0 ||
    password2.length === 0;

  return (
    <>
      <section>
        <h1>
          {" "}
          <FaUser />
          Regiser{" "}
        </h1>
      </section>

      {error && <h3 className="error-msg"> {error}</h3>}

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>

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
            <input
              type="password"
              name="password2"
              id="password2"
              className="form-control"
              value={password2}
              placeholder="Confirm Password"
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

export default RegisterForm;
