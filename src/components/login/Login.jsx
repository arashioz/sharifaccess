// Login.js
import { useRef, useState, useEffect  } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import "./Login.css";
import logo from "../../static/logo2.png";
const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);
  const { setAuth } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "user/login",
        JSON.stringify({
          nationalCode: user,
          phoneNumber: pwd,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.access_token;
      setAuth({ user, pwd, accessToken ,allData: response?.data });
      setUser("");
      setPwd("");
      navigate("/dashboard");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };
  return (
    <>
      <section className="container" dir="rtl">
        <div className="logo-container">
          <img src={logo} className="logo" />
        </div>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <section className="form-container">
          <h1>سامانه ورود و خروج دانشگاه شریف</h1>
          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              id="username"
              placeholder="کد ملی"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
            <input
              type="password"
              id="password"
              placeholder="رمز عبور"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button> ورود</button>
          </form>
        </section>
      </section>
    </>
  );
};

export default Login;
