import React, { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiBell, FiPlus } from "react-icons/fi";
import { IoMdPerson } from "react-icons/io";
import Menu from "./Menu";
import { Link } from "react-router-dom";
import { Alert, AlertTitle, Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = (props) => {
  const [showMenu, setshowMenu] = useState(false);
  const [showDeadline, setShowDeadline] = useState(false);
  const [deadline, setDeadline] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (deadline.length !== 0) {
      localStorage.setItem("deadline", deadline);
    }
  }, [deadline]);

  const d = Date.now();
  const date1 = new Date(d);
  console.log(date1);
  const date2 = new Date(localStorage.getItem("deadline"));
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log(diffTime + " milliseconds");
  console.log(diffDays + " days");

  const handleClose = () => {
    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <nav className="navbar">
      <div className="left">
        <input
          type="text"
          placeholder="Search for the name"
          onChange={(e) => {
            props.setquery(e.target.value);
          }}
          on
        />
      </div>
      <div className="center">
        <h2>
          <Link to="/">Home</Link>
        </h2>
        {localStorage.getItem("Admin User") !== null && (
          <h2
            style={{ cursor: "pointer" }}
            onClick={() => setShowDeadline(!showDeadline)}
          >
            Deadline{" "}
          </h2>
        )}
        {showDeadline && (
          <input
            type="date"
            name=""
            id=""
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        )}

        {localStorage.getItem("Admin User") === null &&
          localStorage.getItem("deadline") !== null && (
            <h2 style={{ cursor: "pointer" }} onClick={() => setOpen(!open)}>
              {" "}
              Notice{" "}
            </h2>
          )}
        <Snackbar
          open={open}
          autoHideDuration={8000}
          onClose={handleClose}
          // message={}
          // action={action}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert action={action} severity="info">
            <AlertTitle>Notice</AlertTitle>
            The Remaining Days for submission of your project are —{" "}
            <strong>{diffDays}</strong>
          </Alert>
        </Snackbar>
      </div>
      <div className="right">
        <div
          className="rightIcons"
          onMouseEnter={() => setshowMenu(true)}
          onMouseLeave={() => setshowMenu(false)}
        >
          <IoMdPerson id="person" />

          <IoMdArrowDropdown style={{ height: "50px" }} />
          {showMenu && (
            <Menu
              setModalOpen={props.setModalOpen}
              setshowMenu={setshowMenu}
              setShowDeadline={setShowDeadline}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
