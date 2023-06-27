import React from "react";
import { Link } from "react-router-dom";

const Menu = (props) => {
  return (
    <div className="menu">
      <div className="menuContainer">
        {localStorage.getItem("Admin User") === null && (
          <p>
            <div onClick={() => props.setModalOpen((previos) => !previos)}>
              {" "}
              Admin login{" "}
            </div>{" "}
          </p>
        )}

        {localStorage.getItem("Admin User") === null && (
          <p>
            {" "}
            <Link to="/student">Student info</Link> <br />{" "}
          </p>
        )}

        {localStorage.getItem("Admin User") !== null && (
          <button
            onClick={() => {
              localStorage.removeItem("Admin User");
              props.setshowMenu(false);
              props.setShowDeadline(false);
            }}
          >
            Log out
          </button>
        )}
      </div>
    </div>
  );
};

export default Menu;
