import { CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import API from "../../api/axios";
import "./Auth.css";

const Auth = () => {
  const navigate = useNavigate();
  const [form, setform] = useState({});
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const HandleValidation = () => {
    const myVar = undefined;
    const { Username, Email, Password, Confirm } = form;
    if (Username === myVar) {
      setUsername("username is required");
      return false;
    } else if (Username?.length < 3) {
      setUsername("username should be greater 3 characters");
      return false;
    } else if (Email === myVar) {
      setEmail("email is required");
      return false;
    } else if (Email?.length < 3) {
      setEmail("email should be greater 3 characters");
      return false;
    } else if (Password === myVar) {
      setPassword("password is required");
      return false;
    } else if (Password?.length < 3) {
      setPassword("Password should be greater 3 characters");
      return false;
    } else if (Password !== Confirm) {
      setConfirm("Password and confirm passsword should be same");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (HandleValidation()) {
      setLoading(true);
      try {
        const { data } = await API.post(`/USER/AJOUTER`, { form });
        console.log(data);
        setLoading(false);
        return navigate("/dash");
      } catch (error) {
        setLoading(false);
        return setEmail("this Email is exist");
      }
    } else {
      console.log("form no valider");
      return setLoading(false);
    }
  };
  console.log(email);
  return (
    <div className="desktopA">
      <div className="divA">
        <div className="text-wrapperA">Project Manager</div>
        <form className="frameA" onSubmit={handleSubmit}>
          <div className="div-wrapperA">
            <div className="text-wrapper-2A">Register</div>
          </div>
          <div className="frame-2A">
            <div className="text-wrapper-3A">Username</div>
            <TextField
              sx={{ width: "300px" }}
              helperText={
                form.Username?.length < 3 || form.Username === undefined
                  ? username
                  : ""
              }
              id="demo-helper-text-aligned"
              name="Username"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="frame-2A">
            <div className="text-wrapper-3A">Email</div>
            {email === null ? (
              <TextField
                sx={{ width: "300px" }}
                helperText={email}
                id="demo-helper-text-aligned"
                name="Email"
                onChange={(e) => handleChange(e)}
              />
            ) : (
              <TextField
                sx={{ width: "300px" }}
                error
                helperText={email}
                id="demo-helper-text-aligned"
                name="Email"
                onChange={(e) => handleChange(e)}
              />
            )}
          </div>
          <div className="frame-2A">
            <div className="text-wrapper-3A">Password</div>
            <TextField
              sx={{ width: "300px" }}
              helperText={
                form.Password?.length < 3 || form.Password === undefined
                  ? password
                  : ""
              }
              id="demo-helper-text-aligned"
              type="password"
              name="Password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="frame-2A">
            <div className="text-wrapper-3A">Confirm</div>
            <TextField
              sx={{ width: "300px" }}
              type="password"
              helperText={confirm}
              id="demo-helper-text-aligned"
              name="Confirm"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="frame-3A">
            {loading && <CircularProgress />}
            {!loading && (
              <button type="submit" className="text-wrapper-4A">
                Register
              </button>
            )}
          </div>
        </form>
        <div className="frame-4A">
          <div className="div-wrapperA">
            <div className="text-wrapper-2A">Login</div>
          </div>
          <div className="frame-2A">
            <div className="text-wrapper-3A">Email</div>
            <TextField
              sx={{ width: "300px" }}
              helperText="Please enter your name"
              id="demo-helper-text-aligned"
            />
          </div>
          <div className="frame-2A">
            <div className="text-wrapper-3A">Password</div>
            <TextField
              sx={{ width: "300px" }}
              helperText="Please enter your name"
              id="demo-helper-text-aligned"
            />
          </div>
          <div className="frame-3A">
            <div className="text-wrapper-4A">Login</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
