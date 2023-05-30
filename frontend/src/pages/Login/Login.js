import React from "react";
import styles from "./Auth.module.scss";
import Card from "../../Components/Card/Card.js";
import { BiLogIn } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { validateEmail } from "../../services/authServices";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import { loginUser } from "../../services/authServices";
import Loader from "../../Components/Loader/Loader";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initState = {
    email: "",
    password: "",
  };
  const [Loading, setLoading] = useState(false);
  const [formData, setformData] = useState(initState);
  const { email, password } = formData;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  const login = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill both email and password");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    setLoading(true);
    const userData = { email, password };
    try {
      const data = await loginUser(userData);

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
            <BiLogIn size={35} />
          </div>
          <h2>Login</h2>

          <form onSubmit={login}>
            <input
              type="text"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInput}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={handleInput}
            />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>

            <Link to="/forgotpw">Forgot Password</Link>
            <span className={styles.register}>
              <p>&nbsp;Don't have an account ?&nbsp;&nbsp;</p>
              <Link to="/register">Register</Link>
            </span>
          </form>
        </div>
      </Card>
    </div>
  );
};
export default Login;
