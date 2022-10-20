import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import "./Dashboard.css";
import { Box } from "@mui/system";
import Avatar from "../../components/avatar/Avatar";
import useAuth from "../../hooks/useAuth";
import Menu from "../../components/menu/Menu";
import logo from "../../static/logo2.png";
import UsersList from "../../components/users-list/UsersList";
import { Outlet } from "react-router-dom";
const Dashboard = () => {
  const { auth } = useAuth();

  let today = new Date().toLocaleDateString("fa-IR");

  let [time, setTime] = useState(new Date());
  function refreshClock() {
    return setTime(new Date());
  }

  let menuItems = [
    {
      id: 1,
      title: "تمامی مجور ها",
      url: "/dashboard",
    },
    {
      id: 2,
      title: "ثبت مجوز جدید",
      url: "/dashboard/newlicence",
    },
  ];

  useEffect(() => {
    const timer = setInterval(refreshClock, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <Grid container className="main-container">
        <Grid item lg={12} className="main">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              padding: "10px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Box
                sx={{
                  backgroundColor: "rgb(255 255 255 / 32%)",
                  border: "none",
                  borderRadius: "10px",
                  padding: "8px",
                  maxHeight: "90%",
                  width: "230px",
                }}
              >
                <Grid>
                  <Grid container spacing={2} direction="row" sx={{ mr: 3 }}>
                    <Grid item>{today}</Grid>
                    <Grid item> | </Grid>
                    <Grid item sx={{ width: 110 }}>
                      {time.toLocaleString("IR", {
                        hour: "numeric",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Grid item lg={7}>
              <Menu menu={menuItems} />
            </Grid>
            <Box sx={{ justifyItems: "center" }}>
              <Avatar nationalcode={auth.user} />
            </Box>
          </Box>
          <Grid
            item
            lg={12}
            style={{
              height: "92%",
              padding: 20,
              overflow: "scroll",
              maxHeight: "93%",
            }}
          >
            <Outlet />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
