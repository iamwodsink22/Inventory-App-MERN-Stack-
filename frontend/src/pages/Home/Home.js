import React from "react";
import "./Home.scss";
import { DiDreamweaver } from "react-icons/di";
import { Link } from "react-router-dom";
import photo from "../../resources/apple.png";
import {
  ShowonLogin,
  ShowonLogout,
} from "../../Components/protect/showonLogin";
const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between">
        <div className="logo">
          <DiDreamweaver size={35} />
        </div>
        <ul className="home-links">
          <ShowonLogout>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ShowonLogout>
          <ShowonLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/login">Login</Link>
              </button>
            </li>
          </ShowonLogout>
          <ShowonLogin>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/dashboard">Dashboard</Link>
              </button>
            </li>
          </ShowonLogin>
        </ul>
      </nav>
      <section className="container hero">
        <div className="hero-text">
          <h2>Online Shopping with DaWodsink</h2>
          <p>
            This Online Shopping system is designed to buy other peoples product
            and sell your own deprecated product to make shopping and sharing
            easier and more efficient
          </p>
        </div>

        <div className="--flex-start">
          <NumText num="14k" text="User" />
          <NumText num="10k" text="Seller" />
          <NumText num="4k" text="Buyer" />
        </div>
        <div className="hero-image">
          <img src={photo} alt="Hello" placeholder="tech" />
        </div>
      </section>
      <div className="hero-buttons">
        <button
          style={{
            marginLeft: "25vw",
            borderRadius: "10vh",
            backgroundColor: "#2C2D2D",
            textDecoration: "none",
          }}
          className="--btn --btn-secondary"
        >
          <Link to="/register">Free Trial 1 Month</Link>
        </button>
      </div>
    </div>
  );
};
const NumText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h2 style={{ color: "#2c2d2d" }}>{num}</h2>
      <p style={{ color: "#2c2d2d" }}>{text}</p>
    </div>
  );
};
export default Home;
