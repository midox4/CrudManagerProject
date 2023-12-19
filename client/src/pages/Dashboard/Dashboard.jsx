import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import API from "../../api/axios";
import Loading from "../../component/Loading";

const Dashboard = () => {
  const [loading, setloading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const [DATA, setDATA] = useState([]);
  const backlog = DATA.filter((project) => project.Status === "Backlog");
  const inProgress = DATA.filter((project) => project.Status === "inProgress");
  const completed = DATA.filter((project) => project.Status === "completed");
  console.log(backlog);

  const goToProgress = async (id) => {
    setloading(true);
    try {
      const { data } = await API.put(`PROJECT/UPDATE/${id}`);
      setloading(false);
      console.log(data);
      setRefresh(!refresh);
      return navigate("/dash");
    } catch (err) {
      console.log(err.message);
      console.log(err.response.status);
    } finally {
      setloading(false);
    }
  };

  const goToCompleted = async (id) => {
    setloading(true);
    try {
      const { data } = await API.put(`PROJECT/UPDATE/COMPLETED/${id}`);
      setloading(false);
      console.log(data);
      setRefresh(!refresh);
      return navigate("/dash");
    } catch (err) {
      console.log(err.message);
      console.log(err.response.status);
    } finally {
      setloading(false);
    }
  };

  const goToRemove = async (id) => {
    setloading(true);
    try {
      const { data } = await API.delete(`PROJECT/DELETE/${id}`);
      setloading(false);
      console.log(data);
      setRefresh(!refresh);
      return navigate("/dash");
    } catch (err) {
      console.log(err.message);
      console.log(err.response.status);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      setloading(true);
      try {
        const { data } = await API.get("/PROJECT/GET");
        setloading(false);
        setDATA(data);
      } catch (err) {
        console.log(err.message);
        console.log(err.response.status);
      } finally {
        setloading(false);
      }
    };
    getData();
  }, [refresh]);

  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="desktop">
          <div className="div">
            <div className="text-wrapper">
              Project Manager
              <Link to="/">
                <button className="btn">Logout</button>
              </Link>
            </div>
            <div className="frame">
              <div className="main">
                <div className="container">
                  <div className="box">
                    <div className="box-title">
                      <div className="text-wrapper-2">Backlog</div>
                    </div>
                    {backlog.length ? (
                      <div className="box1">
                        {backlog.map((elem) => (
                          <div className="box-project" key={elem._id}>
                            <div className="text-wrapper-3">
                              {elem.nameProject}
                            </div>
                            <p className="due">
                              <span className="span">Due : </span>
                              <span className="text-wrapper-4">
                                {elem.Date}
                              </span>
                            </p>
                            <button
                              onClick={(e) => goToProgress(elem._id)}
                              className="frame-2S"
                            >
                              <div className="text-wrapper-5">
                                Start Project
                              </div>
                              <div className="text-wrapper-6">&gt;</div>
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>No Data Exist</>
                    )}
                  </div>
                  <div className="box">
                    <div className="div-wrapper">
                      <div className="text-wrapper-2">In Progress</div>
                    </div>
                    {inProgress.length ? (
                      <div className="box1">
                        {inProgress.map((elem) => (
                          <div className="box-project" key={elem._id}>
                            <div className="text-wrapper-3">
                              {elem.nameProject}
                            </div>
                            <p className="due">
                              <span className="span">Due : </span>
                              <span className="text-wrapper-4">
                                {elem.Date}
                              </span>
                            </p>
                            <button
                              onClick={(e) => goToCompleted(elem._id)}
                              className="frame-2"
                            >
                              <div className="text-wrapper-5">
                                Move to completed
                              </div>
                              <div className="text-wrapper-6">&gt;</div>
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>No Data Exist</>
                    )}
                  </div>
                  <div className="box">
                    <div className="box-title-2">
                      <div className="text-wrapper-2">Completed</div>
                    </div>
                    {completed.length ? (
                      <div className="box1">
                        {completed.map((elem) => (
                          <div className="box-project" key={elem._id}>
                            <div className="text-wrapper-3">
                              {elem.nameProject}
                            </div>
                            <p className="due">
                              <span className="span">Due : </span>
                              <span className="text-wrapper-4">
                                {elem.Date}
                              </span>
                            </p>
                            <button
                              onClick={(e) => goToRemove(elem._id)}
                              className="frame-2R"
                            >
                              <div className="text-wrapper-5">
                                X remove project
                              </div>
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>No Data Exist</>
                    )}
                  </div>
                </div>

                <div className="frame-wrapper">
                  <Link to="/add">
                    <div className="frame-5">
                      <div className="frame-6">
                        <div className="frame-7">
                          <div className="text-wrapper-8">+</div>
                        </div>
                        <div className="text-wrapper-5">Add new Project</div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
