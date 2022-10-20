import "./App.css";
import Login from "./components/login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReqAuth from "./components/reqAuth/ReqAuth";
import Dashboard from "./view/Dashboard/Dashboard";
import UsersList from "./components/users-list/UsersList";
import Userlist from "./components/users-list/Userlist";
import Newlicence from "./components/newlicence/Newlicence";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ReqAuth />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Userlist />} />
              <Route path="newlicence" element={<Newlicence />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
