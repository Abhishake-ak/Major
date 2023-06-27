import axios from "axios";
import React, { useEffect, useState } from "react";

const MainLeft = (props) => {
  const [data, setData] = useState();

  const getTitle = async (name) => {
    await axios.get(`http://localhost:5000/${name}`).then((res) => {
      // console.log( "Testing asnnnn",res.data);
      props.setTitleDescription(res.data);
    });
  };

  const getRespons = async () => {
    await axios.get("http://localhost:5000/names").then((res) => {
      // console.log(res.data);
      setData(res.data);
    });
  };
  useEffect(() => {
    getRespons();
  }, []);

 

  return (
    <div className="main_left">
      <div className="mainLeft">
        <div className="mainLeftLists">
          {data
            ?.filter(
              (i) =>
                i?.name1?.toLowerCase()?.includes(props.query.toLowerCase()) ||
                i.name2?.toLowerCase()?.includes(props.query.toLowerCase()) ||
                i.name3?.toLowerCase()?.includes(props.query.toLowerCase())
            )
            .map((item) => (
              <div className="items">
                <h2 key={item._id} onClick={() => getTitle(item.name1)}>
                  {" "}
                  ◉ {`${item.name1} ${item.name2} ${item.name3}`}
                </h2>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MainLeft;
