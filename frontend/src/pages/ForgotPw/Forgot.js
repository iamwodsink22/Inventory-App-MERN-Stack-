import { Link } from "react-router-dom";
import styles from "../Login/Auth.module.scss";
import Card from "../../Components/Card/Card";
import { AiOutlineMail } from "react-icons/ai";
import { useState } from "react";
import { forgotPw } from "../../services/authServices";
import { toast } from "react-toastify";
import { validateEmail } from "../../services/authServices";
const Forgot = () => {
  const [email, setemail] = useState("");

  const forgotpw = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter an email to reset password");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    try {
      const userData = { email };
      const data = await forgotPw(userData);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <AiOutlineMail size={35} />
          </div>
          <h2>Login</h2>

          <form onSubmit={forgotpw}>
            <input
              type="text"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Send Reset Link
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
export default Forgot;
