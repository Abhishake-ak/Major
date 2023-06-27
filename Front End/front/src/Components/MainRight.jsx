import React, { useState } from "react";
import Axios from "axios";

const MainRight = ({a,b}) => {
  // console.log("prop a data: ",a);
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
    console.log("prossss a",a._id);
  
    // console.log(data);
    

    await Axios.post("http://localhost:5000/comment", { ...data, userID: a._id })
      .then((res) => {
        // console.log(res);
      })
      


    setComment(false);
  };
// console.log();
  //
console.log(a.file);
  const day = new Date(a.createdAt).getDate();
  const months = new Date(a.createdAt).getMonth();
  const year = new Date(a.createdAt).getFullYear();
  // console.log(`${day}/${months}/${year}`);

  return (
    <div className="main_Right">
      <div className="mainRightContainer">
        <div className="box">
          <h2 style={{ color: "white" }}>{a.tittle}</h2>
          <span className="createdBy">
            by{" "}
            {`${a.name1} (${a.roll1})  ${a.name2} (${a.roll2})  ${a.name3} (${a.roll3}) on ${day}/${months}/${year}`}
          </span>
        </div>

        <div className="box"> <div>
        {a.description} 
          </div>
          <br />
        <br /> 
        
  {  a.file &&  <a href={a?.file.path.substring(25)} download={`${a.name1}-${a.name2}-${a.name3}`}>Download</a> }</div>
        
        <br />

        <div className="line"></div>

        <div className="commetData">
          <h1>Comments By Mentor</h1>
          {b?.map((i) => {
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
                <input type="text" name="subject" id="" onChange={handle}  autoComplete="off"/>
                <label htmlFor="">Comment</label>
                <textarea
                  name="commentDes"
                  cols="1"
                  rows="5"
                  onChange={handle}
                  autoComplete="off"
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
