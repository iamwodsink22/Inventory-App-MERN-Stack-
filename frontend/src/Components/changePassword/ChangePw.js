import React from "react";
import "./ChangePw.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import { changePassword } from "../../services/authServices";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";
const initState = {
  oldpassword: "",
  password: "",
  password2: "",
};

const ChangePw = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState(initState);
  const { oldpassword, password, password2 } = formData;
  const handleInput = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  const changePass = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("The new passwords donot match");
    }
    const formData = { oldpassword, password };
    const data = await changePassword(formData);
    navigate("/profile");
    toast.success(data);
  };
  return (
    <div className="change-password">
      <Card cardClass={"password-card"}>
        <h3>Change Password</h3>
        <form className="--form-control" onSubmit={changePass}>
          <input
            type="password"
            placeholder="Old Password"
            name="oldpassword"
            value={oldpassword}
            onChange={handleInput}
          />
          <input
            type="password"
            placeholder="New Password"
            name="password"
            value={password}
            onChange={handleInput}
          />
          <input
            type="password"
            name="password2"
            placeholder="Confirm New Password"
            value={password2}
            onChange={handleInput}
          />
          <button className="--btn --btn-primary">Change Password</button>
        </form>
      </Card>
    </div>
  );
};

export default ChangePw;
