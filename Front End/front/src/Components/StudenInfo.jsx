import React, { useState, useRef } from "react";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const StudenInfo = () => {
  const navigate = useNavigate();
  // const[fileData,setFileData] = useState();
  const [data, setData] = useState({
    name1: "",
    name2: "",
    name3: "",
    roll1: "",
    roll2: "",
    roll3: "",
    tittle: "",
    description: "",
    
    

  });
 
  const handleSubmit = async (e) => {

    e.preventDefault();
   
   

      await Axios.post("http://localhost:5000/details", 
     data
    ).then((res) => {
      console.log(res);
      console.log(data);
    });
    
    
   
    navigate("/");
  };

  const handle = (e) => {
    console.log(e.target.value);
    const s = e.target.name;
    const value = e.target.value;
    setData({ ...data, [s]: value });
  
  };

//  console.log(fileData);
  

  return (
    <div className="student">
      <div className="maininfo">
        <div className="tittle"> Student information </div>
        <div className="line"> </div>
        <form
          className="form"
          onSubmit={handleSubmit}
          enctype="multipart/form-data"
      
        >
          <div className="form1">
            <div className="name">
              <label htmlFor="">Name 1</label>
              <input
                type="text"
                name="name1"
                value={data.name1}
                onChange={handle}
                id=""
              />
              <label htmlFor="">Name 2</label>
              <input
                type="text"
                name="name2"
                value={data.name2}
                onChange={handle}
                id=""
                required
              />
              <label htmlFor="">Name 3</label>
              <input
                type="text"
                name="name3"
                value={data.name3}
                onChange={handle}
                id=""
                required
              />
            </div>
            <div className="roll">
              <label htmlFor="">Roll Number</label>
              <input
                type="text"
                name="roll1"
                value={data.roll1}
                onChange={handle}
                id=""
                required
              />
              <label htmlFor="">Roll Number</label>
              <input
                type="text"
                name="roll2"
                value={data.roll2}
                onChange={handle}
                id=""
                required
              />
              <label htmlFor="">Roll Number</label>
              <input
                type="text"
                name="roll3"
                value={data.roll3}
                onChange={handle}
                id=""
                required
              />
            </div>
          </div>

          <div className="form2">
            <div>
              <label htmlFor="">Topic</label>
              <input
                type="text"
                name="tittle"
                value={data.tittle}
                onChange={handle}
                autoComplete="off"
                id=""
                required
              />
            </div>
            <div>
              <label htmlFor="">Description</label>
              <textarea
                name="description"
                id=""
                value={data.description}
                cols="30"
                rows="10"
                onChange={handle}
                autoComplete="off"
                required
              ></textarea>

              {/* <input
                type="file"
                name="file"
               
                id=""
                onChange={(e)=>setFileData(e.target.files[0])}
              /> */}

            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default StudenInfo;
