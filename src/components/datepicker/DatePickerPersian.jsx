import * as React from "react";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { makeStyles } from "@mui/styles";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import AdapterJalaali from "@date-io/jalaali";
import "./DatePickerPersian.css";

const useStyles = makeStyles({
  root: {
    fontFamily: "inherit",
    color: "red",
  },
});
export default function DatePickerPersian(props) {
  const classes = useStyles();

  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));

  return (
    <div dir="rtl">
      <LocalizationProvider dateAdapter={AdapterJalaali}>
        <Stack
          spacing={3}
          sx={{ margin: 1, direction: "rtl", fontFamily: "vazir " }}
        >
          <MobileDateTimePicker
            className={classes.root}
            label={props.label}
            renderInput={(params) => (
              <TextField
                className="main-datepicker"
                variant="filled"
                sx={{ style: { fontFamily: "vazir" } }}
                InputLabelProps={{
                  style: { fontFamily: "vazir", left: "revert" },
                }}
                {...params}
              />
            )}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            componentsProps={{
              root: { className: "custom-root" },
              tabs: ["DateTimePickerTabs"],
              OpenPickerIcon: [],
              actionBar: {
                actions: ["today"],
                dir: "rtl",
                title: ["sadasd"],
              },
            }}
            closeOnSelect={true}
          />
        </Stack>
      </LocalizationProvider>
    </div>
  );
}
