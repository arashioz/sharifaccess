import * as React from "react";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import AdapterJalaali from "@date-io/jalaali";
import "./DatePickerPersian.css";
export default function DatePickerPersian(props) {
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));

  return (
    <div dir="rtl">
      <LocalizationProvider dateAdapter={AdapterJalaali}>
        <Stack
          spacing={3}
          sx={{ margin: 1, direction: "rtl", fontFamily: "vazir " }}
        >
          <MobileDateTimePicker
            className="main-datepicker"
            label={props.label}
            renderInput={(params) => (
              <TextField
                className="main-datepicker"
                variant="filled"
                InputLabelProps={{
                  style: { fontFamily: "vazir",left:'revert'},
                  
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
              actionBar: {
                actions: ["today"],
                dir: "rtl",
              },
              switchViewButton: {
                today: "s",
              },
            }}
          />
        </Stack>
      </LocalizationProvider>
    </div>
  );
}
