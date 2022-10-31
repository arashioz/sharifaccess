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
  },
});
export default function DatePickerPersian(props) {
  const classes = useStyles();

  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));

  // function setter() {
  //   return props.getValue(value._d);
  // }
  return (
    <div dir="rtl">
      <LocalizationProvider dateAdapter={AdapterJalaali}>
        <Stack
          spacing={3}
          sx={{ margin: 1, direction: "rtl", fontFamily: "vazir " }}
        >
          <MobileDateTimePicker
            // className={classes.root}
            label={props.label}
            required
            value={value}
            mask="____/__/__"
            renderInput={(params) => (
              <TextField
                value={props.value}
                error={props.error}
                helperText={props.helperText}
                variant="filled"
                InputLabelProps={{
                  style: { fontFamily: "vazir", left: "revert" },
                }}
                {...params}
              />
            )}
            // value={props.value}
            onChange={(newV) => {
              setValue(newV);
              props.onChange(newV);
            }}
            componentsProps={{
              actionBar: {
                actions: ["today"],
              },
            }}
            closeOnSelect={true}
          />
        </Stack>
      </LocalizationProvider>
    </div>
  );
}
