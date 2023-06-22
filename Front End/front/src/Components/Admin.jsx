import React, { useState } from "react";
import "../Styles/Admin.css";
import { json, useNavigate } from "react-router-dom";

const Admin = (props) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    Username: "",
    Password: "",
  });
  const handle = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (login.Username === "Admin@123" && login.Password === "Admin@123") {
      localStorage.setItem(
        "Admin User",
        JSON.stringify({ Username: login.Username, Password: login.Password })
      );
      props.setModalOpen(false);
    } else {
      window.alert("Enter Again");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="adminForm">
        <h3> Admin Login </h3>

        <label>Username</label>
        <input
          type="text"
          placeholder="Email or Phone"
          name="Username"
          value={login.Username}
          onChange={handle}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          name="Password"
          value={login.Password}
          onChange={handle}
        />

        <button>Log In</button>
      </form>
    </div>
  );
};

export default Admin;
