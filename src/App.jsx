import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await axios.get("http://localhost:3000/authors");
    setData(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const authorWrapperClick = (id) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return { ...item, hasBeenRead: !item.hasBeenRead };
      }
      return item;
    });

    setData(updatedData);
  };
  const allRead = () => {
    const updatedData = data.map((item) => {
      return { ...item, hasBeenRead: true };
    });
    setData(updatedData);
  };

  return (
    <>
      <div className="container">
        <div className="top">
          <h4>
            Notifications{" "}
            <span className="tops1">
              {data.reduce((acc, cur) => {
                return acc + (cur?.hasBeenRead === false ? 1 : 0);
              }, 0)}
            </span>
          </h4>
          <span onClick={allRead} className="tops2">
            Mark all as read
          </span>
        </div>
        <div className="authors">
          {data.map((item) => (
            <div key={item.id} className="author">
              <div
                style={{
                  background: item?.hasBeenRead === false ? "aliceblue" : null,
                  cursor: "pointer",
                }}
                className="author-wrapper"
                onClick={() => authorWrapperClick(item.id)}
              >
                <div className="left">
                  <img src={item?.author?.img} alt={item?.author?.name} />
                </div>
                <div className="right">
                  <div>
                    <p className="topPar">
                      <span className="name">{item?.author?.name}</span>{" "}
                      <span className="text">{item?.text}</span>{" "}
                      {item?.link && (
                        <a className="link" href="#">
                          {item?.link.text}
                        </a>
                      )}{" "}
                      {item?.hasBeenRead === false ? (
                        <span className="pink"></span>
                      ) : null}
                    </p>{" "}
                    <p className="time">{item?.time}</p>
                    {item?.privateMessage && (
                      <p className="private">{item?.privateMessage}</p>
                    )}
                  </div>

                  {item?.image && (
                    <img className="chessImg" src={item?.image?.img} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
