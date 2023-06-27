import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudenInfo = () => {
  const navigate = useNavigate();
  const [form, setform] = useState({});
  const [deadline, setDeadline] = useState('');
  
  const handleChange = (e) =>{
    if(e.target.name === 'file'){
      setform({
        ...form, 
        [e.target.name]: e.target.files[0]
      })
    } else {
      setform({
        ...form, 
        [e.target.name]: e.target.value
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fileFormData = new FormData()
    for(const key in form){
      fileFormData.append(key,form[key])
    }

    await axios.post("http://localhost:5000/details", fileFormData).then((res) => {
      console.log(res);
    });

    await navigate("/");
  };

  useEffect(() => {
    const storedDeadline = localStorage.getItem('deadline');
    if (storedDeadline) {
      setDeadline(storedDeadline);
    }
  }, []);
  function hasDeadlinePassed(deadline) {
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);

    return currentDate > deadlineDate;
  }

  return (
    <div className="student">
      <div className="maininfo">
        <div className="tittle"> Student information 
        { localStorage.getItem("deadline")!==null && (hasDeadlinePassed(deadline) ? (
        <p>The deadline has passed.</p>
      ) : (
        <p>The deadline has not passed yet , last date for submission {localStorage.getItem("deadline")}.</p>
      ))}
      </div>
        <div className="line"> </div>
        <form
          className="form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form1">
            <div className="name">
              <label htmlFor="">Name 1</label>
              <input
                type="text"
                name="name1"
                value={form.name1}
                onChange={(e) => handleChange(e)}
                autoComplete="off"
                
              />
              <label htmlFor="">Name 2</label>
              <input
                type="text"
                name="name2"
                value={form.name2}
                onChange={(e) => handleChange(e)}
                autoComplete="off"
                required
              />
              <label htmlFor="">Name 3</label>
              <input
                type="text"
                name="name3"
                value={form.name3}
                onChange={(e) => handleChange(e)}
                autoComplete="off"
                required
              />
            </div>
            <div className="roll">
              <label htmlFor="">Roll Number</label>
              <input
                type="text"
                name="roll1"
                value={form.roll1}
                onChange={(e) => handleChange(e)}
                autoComplete="off"
                required
              />
              <label htmlFor="">Roll Number</label>
              <input
                type="text"
                name="roll2"
                value={form.roll2}
                onChange={(e) => handleChange(e)}
                autoComplete="off"
                required
              />
              <label htmlFor="">Roll Number</label>
              <input
                type="text"
                name="roll3"
                value={form.roll3}
                onChange={(e) => handleChange(e)}
                autoComplete="off"
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
                value={form.title}
                onChange={(e) => handleChange(e)}
                autoComplete="off"
                required
              />
            </div>
            <div>
              <label htmlFor="">Description</label>
              <textarea
                name="description"
                value={form.description}
                cols="30"
                rows="10"
                onChange={(e) => handleChange(e)}
                autoComplete="off"
               
                required
              ></textarea>

              <input
                type="file"
                name="file"
                onChange={(e)=>handleChange(e)}
              />
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default StudenInfo;
