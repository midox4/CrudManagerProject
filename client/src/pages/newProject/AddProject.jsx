import { CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import "./AddProject.css";

const AddProject = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(false);
  const [msgDate, setMsgDate] = useState(false);
  const [validation, setvalidation] = useState(null);
  const [validationDate, setvalidationDate] = useState();
  const [form, setform] = useState({});
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const HandleValidation = () => {
    const myVar = undefined;
    const { nameProject, Date } = form;
    if (nameProject === myVar) {
      setMsg(true);
      setvalidation("name project is required");
      return false;
    }
    if (Date === myVar) {
      setMsgDate(true);
      setvalidationDate("Date is required");
      return false;
    }
    return true;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (HandleValidation()) {
      try {
        const { data } = await API.post(`/PROJECT/ADD`, { form });
        console.log(data);
        setLoading(false);
        return navigate("/dash");
      } catch (error) {
        setLoading(false);
        setMsg(true);
        return setvalidation("name project is exist");
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Form Validation Error");
      return setLoading(false);
    }
  };
  console.log(validation);
  return (
    <div className="desktopP">
      <form className="divP" onSubmit={handleSubmit}>
        <div className="text-wrapperP">Project Manager</div>
        <Link to="/dash">
          <div className="text-wrapper-2P">Back To dashboard</div>
        </Link>
        <div className="groupP">
          <div className="overlap-groupP">
            <div className="frameP">
              <div className="frame-2P">
                <div className="text-wrapper-3P">Project</div>
                {msg ? (
                  <TextField
                    sx={{ width: "500px" }}
                    error
                    helperText={validation}
                    id="demo-helper-text-aligned"
                    name="nameProject"
                    onChange={(e) => handleChange(e)}
                  />
                ) : (
                  <TextField
                    sx={{ width: "500px" }}
                    id="demo-helper-text-aligned"
                    name="nameProject"
                    onChange={(e) => handleChange(e)}
                  />
                )}
              </div>
              <div className="frame-3P">
                <div className="text-wrapper-3P">Due Date</div>
                {msgDate ? (
                  <TextField
                    sx={{ width: "500px" }}
                    type="date"
                    helperText={
                      form.Date !== undefined
                        ? setMsgDate(false)
                        : validationDate
                    }
                    error
                    name="Date"
                    onChange={(e) => handleChange(e)}
                  />
                ) : (
                  <TextField
                    sx={{ width: "500px" }}
                    type="date"
                    name="Date"
                    onChange={(e) => handleChange(e)}
                  />
                )}
              </div>
              {loading && <CircularProgress />}
              {!loading && (
                <div className="div-wrapperP">
                  <button type="submit" className="text-wrapper-4P">
                    Plan Project
                  </button>
                </div>
              )}
            </div>
            <div className="frame-4P">
              <div className="text-wrapper-4P">Plan a new project</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
