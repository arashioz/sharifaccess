// Login.js
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import "./Login.css";
import logo from "../../static/logo2.png";
import { Grid, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Fingerprint from "@mui/icons-material/Fingerprint";
// import Button from "@mui/material/Button";
// import { Stack } from "@mui/system";
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
      setAuth({ user, pwd, accessToken, allData: response?.data });
      setUser("");
      setPwd("");
      navigate("/dashboard");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("مشکل از سمت سرورو میباشد");
      } else if (err.response?.status === 400) {
        setErrMsg("نام کاربری یا رمز عبور اشتباه است");
      } else if (err.response?.status === 401) {
        setErrMsg("احراز نشده");
      } else {
        setErrMsg("مشکل در اینترنت وحود دارد ");
      }
      errRef.current.focus();
    }
  };
  return (
    <Grid container className="container" sx={{ dir: "rtl" }}>
      <Grid item xs sm md lg>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
      </Grid>{" "}
      <Grid item xs={8} sm={8} lg={6} md={6}>
        <Grid item xs={2} lg={2} sx={{ margin: " auto" }}>
          <img
            src={logo}
            style={{
              marginTop: "15vh",
              width: "100%",
              height: "auto",
              backdropFilter: "blur(27px)",
              borderRadius: 100,
            }}
          />
        </Grid>
        <Grid
          item
          xs={10}
          lg={5}
          md={5}
          sx={{
            borderRadius: 3,
            padding: "20px",
            margin: "0 auto",
            backdropFilter: "blur(27px)",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyItems: "center",
              justifyContent: "space-around",
            }}
          >
            <h4>سامانه ورود خروج دانشگاه شریف</h4>
            <TextField
              onChange={(e) => setUser(e.target.value)}
              value={user}
              ref={userRef}
              variant="filled"
              required
              color="warning"
              sx={{ marginTop: 2 }}
              inputProps={{ style: { color: "white" } }}
              InputLabelProps={{
                style: {
                  color: "white",
                  fontFamily: "vazir",
                  left: "revert",
                  paddingRight: 10,
                },
                shrink: true,
              }}
              label=" کد ملی"
            />
            <TextField
              type="password"
              variant="filled"
              sx={{ marginTop: 3 }}
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              label="شماره همراه"
              required
              inputProps={{ style: { color: "white" } }}
              color="warning"
              InputLabelProps={{
                style: {
                  color: "white",
                  fontFamily: "vazir",
                  left: "revert",
                  paddingRight: 2,
                },
                shrink: true,
              }}
            />

            {/* <button style={{ background: "transparent" }}> */}
              <IconButton
                type="submit"
                sx={{
                  borderRadius: "10px",
                  color: "white",
                  background: "transparent",
                }}
                aria-label="fingerprint"
              >
                <span>ورود</span>
                <Fingerprint />
              </IconButton>
            {/* </button> */}
          </form>
        </Grid>
      </Grid>
      <Grid item xs sm md lg></Grid>{" "}
    </Grid>
  );
};

export default Login;
