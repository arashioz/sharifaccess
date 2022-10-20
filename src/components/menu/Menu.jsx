import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import "./Menu.css";

export default function Menu(props) {
  const [active, setActive] = React.useState(1);

  const activeHandler = (e) => {
    console.log(e.target.id);
    setActive(e.target.id);
    console.log(active);
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgb(255 255 255 / 32%)",
        border: "none",
        borderRadius: "10px",
        padding: "8px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: "40px",
      }}
    >
      {props.menu.map((m) => {
        return (
          <Link key={m.id} className="links" to={`${m.url}`}>
            <Box
              key={m.id}
              id={m.id}
              onClick={(e) => activeHandler(e)}
              className={`tabs ${active == m.id ? "active" : ""}`}
            >
              {m.title}
            </Box>
          </Link>
        );
      })}
    </Box>
  );
}
