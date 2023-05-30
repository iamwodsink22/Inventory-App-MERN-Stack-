import React, { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { NavLink } from "react-router-dom";
import "./Sidebar.scss";
const activeSubLink = ({ isActive }) => (isActive ? "active" : "link");
const activeLink = ({ isActive }) => (isActive ? "active" : "link");

function SidebarItem({ item, isOpen }) {
  const [expandMenu, setExpandMenu] = useState(false);
  const closeExpand = () => {
    setExpandMenu(!expandMenu);
  };

  if (item.childrens) {
    return (
      <div
        className={
          expandMenu ? "sidebar-item s-parent open" : "sidebar-item s-parent"
        }
      >
        <div className="sidebar-title">
          <span>
            {item.icon && <div className="icon">{item.icon}</div>}
            {isOpen && <div>{item.title}</div>}
          </span>
          <MdKeyboardArrowRight
            size={25}
            className="arrow-icon"
            onClick={closeExpand}
          />
        </div>
        <div className="sidebar-content">
          {item.childrens.map((child, index) => {
            return (
              <div key={index} className="s-child">
                <NavLink
                  style={{ textDecoration: "none" }}
                  to={child.path}
                  className={activeSubLink}
                >
                  <div className="sidebar-item">
                    <div className="sidebar-title">
                      {child.icon && <div className="icon">{child.icon}</div>}
                      {isOpen && <div>{child.title}</div>}
                    </div>
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <NavLink
        style={{ textDecoration: "none" }}
        to={item.path}
        className={activeLink}
      >
        <div className="sidebar-item s-parent">
          <div className="sidebar-title">
            <span>
              {item.icon && <div className="icon">{item.icon}</div>}
              {isOpen && <div>{item.title}</div>}
            </span>
          </div>
        </div>
      </NavLink>
    );
  }
}

export default SidebarItem;
