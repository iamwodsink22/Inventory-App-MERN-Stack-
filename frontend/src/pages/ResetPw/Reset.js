import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../Login/Auth.module.scss";
import Card from "../../Components/Card/Card";
import { CiPower } from "react-icons/ci";
import { useState } from "react";
import { ResetPw } from "../../services/authServices";
import { toast } from "react-toastify";
const init = {
  password1: "",
  password2: "",
};

const Reset = () => {
  const navigate = useNavigate();

  const [formData, setformData] = useState(init);
  const { password, password2 } = formData;
  const { token } = useParams();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  const resetPw = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast.error("Password must be at least 6 character long");
    }
    if (password !== password2) {
      toast.error("Password must be matching");
    }
    const userData = { password, password2 };
    try {
      const data = await ResetPw(userData, token);

      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <CiPower size={35} />
          </div>
          <h2>Reset Password</h2>

          <form onSubmit={resetPw}>
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={handleInput}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              name="password2"
              value={password2}
              onChange={handleInput}
            />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Reset Password
            </button>

            <div className={styles.links}>
              <p>
                <Link to="/login">-Login</Link>
              </p>
              <p>
                <Link to="/register">-Register</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};
export default Reset;
