import React from "react";
import "./Contact.scss";
import { useState } from "react";
import Card from "../../Components/Card/Card";
import { FaPhoneAlt, FaEnvelope, FaLinkedin } from "react-icons/fa";
import { BiLocationPlus } from "react-icons/bi";
import axios from "axios";
import { BACKEND_URL } from "../../services/authServices";
import { toast } from "react-toastify";

const Contact = () => {
  const [subject, setsubject] = useState("");
  const [message, setmessage] = useState("");
  const data = {
    subject,
    message,
  };
  const sendMail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/contact`, data);
      setsubject("");
      setmessage("");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="contact">
      <h3 className="--mt">Contact Us</h3>
      <div className="section">
        <form onSubmit={sendMail}>
          <Card className="card">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              required
              placeholder="Subject"
              value={subject}
              onChange={(e) => setsubject(e.target.value)}
            />
            <label>Subject</label>
            <textarea
              cols="30"
              rows="10"
              name="subject"
              required
              placeholder="Enter Your Message"
              value={message}
              onChange={(e) => setmessage(e.target.value)}
            ></textarea>
            <button className="--btn --btn-primary">Send Message</button>
          </Card>
        </form>
        <div className="details">
          <Card cardClass={"card2"}>
            <h3>Our Contact Information</h3>
            <p>Fill the form or contact us via other channels listed below</p>

            <div className="icons">
              <span>
                <FaPhoneAlt />
                <p>9843224120</p>
              </span>
              <span>
                <FaEnvelope />
                <p>arakshapuri22@gmail.com</p>
              </span>
              <span>
                <BiLocationPlus />
                <p>Mangalbazar,Lalitpur</p>
              </span>
              <span>
                <FaLinkedin />
                <p>Araksha Puri</p>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
