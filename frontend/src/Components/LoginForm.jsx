import React, { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import axios from 'axios'
import { login } from "../constants";
import {useNavigate} from 'react-router-dom'

function LoginForm() {
  const navigate = useNavigate();
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const {data} = await axios.post(login, {email, password})

    if(data.user) {
      localStorage.setItem('TOKEN', data.user.token)
      navigate('/')
    }
  };

  return (
    <>
      <section>
        <h1>
          {" "}
          <FaSignInAlt />
          Login{" "}
        </h1>
      </section>

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
              type="text"
              name="password"
              id="password"
              className="form-control"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              {" "}
              Submit{" "}
            </button>
          </div>

          {error && <p> {error}</p>}
        </form>
      </section>
    </>
  );
}

export default LoginForm;
