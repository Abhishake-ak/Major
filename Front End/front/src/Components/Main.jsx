import React, { useEffect, useState } from "react";
import MainLeft from "./MainLeft";
import MainRight from "./MainRight";
import "../../src/Styles/Main.css";
import Axios from "axios";
import Welcome from "./Welcome";



const Main = (props) => {




  const [commentData, setCommentData] = useState();

  const [titleDescription, setTitleDescription] = useState({});

  const getcomment = async () => {
    if (titleDescription._id) {
      await Axios.get(
        `http://localhost:5000/commentsData/${titleDescription._id}`
      ).then((res) => {
        setCommentData(res.data);
      });
    }
  };

  useEffect(() => {
    getcomment();
  }, [titleDescription]);
 

  return (
    <div className="main">
 

      <MainLeft query={props.query} setTitleDescription={setTitleDescription} />
    { Object.keys(titleDescription).length===0 ? <Welcome/> : <MainRight a={titleDescription} b={commentData} /> }  
    </div>
  );
};

export default Main;
