import * as React from "react";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { styled } from "@mui/joy/styles";
import Button from "@mui/joy/Button";
import MenuList from "@mui/joy/MenuList";
import MenuItem from "@mui/joy/MenuItem";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const Popup = styled(PopperUnstyled)({
  zIndex: 1000,
});

export default function Avatar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      setAnchorEl(null);
    } else if (event.key === "Escape") {
      anchorEl.focus();
      setAnchorEl(null);
    }
  };

  const logoutHanlder = () => {
    setAuth(null);
    navigate("/");
  };

  return (
    <div>
      <Button
        style={{
          backgroundColor: "rgb(255 255 255 / 32%)",
          border: "none",
          borderRadius: "10px",
        }}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        color="neutral"
        onClick={handleClick}
        sx={{ borderRadius: 0 }}
      >
        {"کاربر  ,"}
        {props ? props.nationalcode : "null"}
        <span>
          <ArrowDropDown />
        </span>
      </Button>
      <Popup
        role={undefined}
        id="composition-menu"
        open={open}
        anchorEl={anchorEl}
        disablePortal
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 4],
            },
          },
        ]}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <MenuList
            style={{
              backgroundColor: "rgb(255 255 255 / 80%)",
              border: "none",
              zIndex:'200',
              borderRadius: "10px",
            }}
            variant="outlined"
            onKeyDown={handleListKeyDown}
            sx={{ boxShadow: "md", bgcolor: "background.body" }}
          >
            <MenuItem onClick={logoutHanlder}>خروج</MenuItem>
          </MenuList>
        </ClickAwayListener>
      </Popup>
    </div>
  );
}
