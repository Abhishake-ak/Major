import React, { useEffect, useState } from "react";
import Axios from "axios";

const MainRight = (props) => {
  const [showComment, setComment] = useState(false);
  const [data, setdata] = useState({
    subject: "",
    commentDes: "",
    userID: "",
  });

  // console.log(props.b);

  const handle = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setdata({ ...data, userID: props.a._id });
    console.log(data);

    await Axios.post("http://localhost:5000/comment", data)
      .then((res) => {
        console.log(res);
      })
      


    setComment(false);
  };

  //

  const day = new Date(props.a.createdAt).getDate();
  const months = new Date(props.a.createdAt).getMonth();
  const year = new Date(props.a.createdAt).getFullYear();
  // console.log(`${day}/${months}/${year}`);

  return (
    <div className="main_Right">
      <div className="mainRightContainer">
        <div className="box">
          <h2 style={{ color: "white" }}>{props.a.tittle}</h2>
          <span className="createdBy">
            by{" "}
            {`${props.a.name1} ${props.a.roll1} ${props.a.name2} ${props.a.roll2} ${props.a.name3} ${props.a.roll3} on ${day}/${months}/${year}`}
          </span>
        </div>

        <div className="box">{props.a.description}</div>
        <br />
        <br />
        <div className="line"></div>

        <div className="commetData">
          <h1>Comments By Mentor</h1>
          {props.b?.map((i) => {
            return (
              <div className="commentBox">
                <h3>
                  {i.subject}{" "}
                  <span>
                    {" "}
                    - {new Date(i.createdAt).getDate()}/
                    {new Date(i.createdAt).getMonth()}/
                    {new Date(i.createdAt).getFullYear()}{" "}
                    {new Date(i.createdAt).getHours()}:
                    {new Date(i.createdAt).getMinutes()}:
                    {new Date(i.createdAt).getSeconds()}
                  </span>{" "}
                </h3>

                <p>{i.commentDes}</p>
              </div>
            );
          })}
        </div>
      </div>

      {localStorage.getItem("Admin User") !== null && (
        <div>
          {" "}
          <span className="commentB" onClick={() => setComment(!showComment)}>
            Add comment
          </span>
          {showComment && (
            <div>
              <form action="" onSubmit={handleSubmit} className="commentForm">
                <h3> Add Comment </h3>
                <div className="line"></div>
                <label htmlFor="">Subject</label>
                <input type="text" name="subject" id="" onChange={handle} />
                <label htmlFor="">Comment</label>
                <textarea
                  name="commentDes"
                  cols="1"
                  rows="5"
                  onChange={handle}
                ></textarea>
                <button type="submit">Add</button>
              </form>
            </div>
          )}{" "}
        </div>
      )}
    </div>
  );
};

export default MainRight;
