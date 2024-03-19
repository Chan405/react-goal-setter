import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { register } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorHandler } from "../utils/errorHandler";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    profile: null,
  });

  const navigate = useNavigate();

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profile: e.target.files[0],
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // const userData = new FormData();
    // userData.append("name", formData.name);
    // userData.append("email", formData.email);
    // userData.append("password", formData.password);
    // userData.append("profile", formData.profile);

    try {
      const { data } = await axios.post(register, { name, email, password });
      if (data.user) {
        console.log(data.user);
        navigate("/login");
      }
    } catch (e) {
      errorHandler(e);
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

          {/* <div className="form-group">
            <input
              type="file"
              name="profile"
              id="profile"
              className="form-control"
              placeholder="Choose profile"
              onChange={handleFileChange}
            />
          </div> */}

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
