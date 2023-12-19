import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard"
import AddProject from "./pages/newProject/AddProject";
import Auth from "./pages/Auth/Auth";
import Loading from "./component/Loading";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Auth />} />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/add" element={<AddProject />} />
          <Route path="/loa" element={<Loading />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
