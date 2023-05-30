import { useState } from "react";
import "./Sidebar.scss";
import { BsVimeo } from "react-icons/bs";
import { HiMenuAlt3 } from "react-icons/hi";
import menu from "../data/sidedata";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";
const Sidebar = ({ children }) => {
  const [isOpen, setisopen] = useState(true);
  const toggle = () => {
    setisopen(!isOpen);
  };
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  return (
    <div className="layout">
      <div className="sidebar" style={{ width: isOpen ? "230px" : "60px" }}>
        <div className="top_section">
          <div className="logo" style={{ display: isOpen ? "block" : "none" }}>
            <BsVimeo size={35} style={{ cursor: "pointer" }} onClick={goHome} />
          </div>
          <div
            className="bars"
            style={{ marginLeft: isOpen ? "100px" : "0px" }}
          >
            <HiMenuAlt3
              size={35}
              onClick={toggle}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        {menu.map((item, index) => {
          return <SidebarItem key={index} item={item} isOpen={isOpen} />;
        })}
      </div>
      <main
        style={{
          paddingLeft: isOpen ? "230px" : "60px",
          transition: "all .5s",
        }}
      >
        {children}
      </main>
    </div>
  );
};
export default Sidebar;
