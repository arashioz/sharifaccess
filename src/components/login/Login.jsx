// Login.js
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import "./Login.css";
import logo from "../../static/logo2.png";
import { Grid, TextField } from "@mui/material";
import { height } from "@mui/system";
const Login = () => {
  // const userRef = useRef();
  // const errRef = useRef();
  // const [user, setUser] = useState("");
  // const [pwd, setPwd] = useState("");
  // const [errMsg, setErrMsg] = useState("");

  // const navigate = useNavigate();
  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);


  // useEffect(() => {
  //   setErrMsg("");
  // }, [user, pwd]);
  // const { setAuth } = useAuth();
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "user/login",
  //       JSON.stringify({
  //         nationalCode: user,
  //         phoneNumber: pwd,
  //       }),
  //       {
  //         headers: { "Content-Type": "application/json" },
  //         withCredentials: true,
  //       }
  //     );
  //     const accessToken = response?.data?.access_token;
  //     setAuth({ user, pwd, accessToken, allData: response?.data });
  //     setUser("");
  //     setPwd("");
  //     navigate("/dashboard");
  //   } catch (err) {
  //     if (!err?.response) {
  //       setErrMsg("No Server Response");
  //     } else if (err.response?.status === 400) {
  //       setErrMsg("Missing Username or Password");
  //     } else if (err.response?.status === 401) {
  //       setErrMsg("Unauthorized");
  //     } else {
  //       setErrMsg("Login Failed");
  //     }
  //     errRef.current.focus();
  //   }
  // };
  return (

    <Grid container className="container" sx={{ dir: 'rtl' }}>
      <Grid item xs={6} lg={6} sx={{ border: '1px solid red' }}>
        <Grid item xs={2} lg={2} sx={{ margin: 'auto' }}>
          <img src={logo} style={{ width: '100%', height: "auto", backdropFilter: 'blur(27px)', borderRadius: 80 }} />
        </Grid>
        <Grid item xs={2} sx={{ margin: '0 auto', backdropFilter: 'blur(27px)' }}>
          <TextField />
        </Grid>
      </Grid>

    </Grid>


  );
};

export default Login;
