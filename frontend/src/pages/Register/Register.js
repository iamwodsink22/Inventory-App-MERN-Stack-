import React, { useState } from "react";
import styles from "../Login/Auth.module.scss";
import Card from "../../Components/Card/Card";
import { BiRegistered } from "react-icons/bi";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, validateEmail } from "../../services/authServices";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import Loader from "../../Components/Loader/Loader";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initState = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };
  const [Loading, setLoading] = useState(false);
  const [formData, setformData] = useState(initState);
  const { name, email, password, password2 } = formData;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  const Register = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast.error("All input fields must be filled");
    }
    if (password !== password2) {
      return toast.error("Password donot match");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 character long");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    const userData = {
      name,
      email,
      password,
    };
    setLoading(true);
    try {
      const data = await registerUser(userData);

      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/dashboard");

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className={`container ${styles.auth}`}>
      {Loading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <BiRegistered size={35} />
          </div>
          <h2>Register</h2>

          <form onSubmit={Register}>
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              required
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Register
            </button>

            <span className={styles.register}>
              <p>&nbsp;Already have an account ?&nbsp;&nbsp;</p>
              <Link to="/login">Login</Link>
            </span>
          </form>
        </div>
      </Card>
    </div>
  );
};
export default Register;
