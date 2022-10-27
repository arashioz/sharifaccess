import { Box } from "@mui/joy";
import React, { useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import DatePickerPersian from "../datepicker/DatePickerPersian";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { makeStyles } from "@mui/styles";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import AdapterJalaali from "@date-io/jalaali";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    fontFamily: "inherit",
    color: "red",
  },
});
const Newlicence = () => {
  // const [startDate, getStartDate] = useState(null);
  // const [endDate, getEnddate] = useState(null);
  // const classes = useStyles();

  const { auth } = useAuth();

  const [formValues, setFormValues] = useState([
    {
      nId: "",
      name: "",
      startDate: "",
      endDate: dayjs("2014-08-18T21:11:54"),
    },
  ]);

  const handleFormChange = (index, event) => {
    let data = [...formValues];
    data[index][event.target.name] = event.target.value;
    setFormValues(data);
    console.log(index, event.target.name, event.target.value);
  };
  const handleFormChangeDatePicker = (index, event, field) => {
    let data = [...formValues];

    data[index][field] = changeToISo(event._d);
    console.log(data);
  };

  let addFormFields = () => {
    setFormValues([
      ...formValues,
      {
        nId: "",
        name: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  const changeToISo = (v) => {
    // let str = Object.values(v).toString();
    let date = new Date(v);
    return date.toISOString();
  };

  let handleSubmit = async (event, idx) => {
    event.preventDefault();
    formValues.forEach(async (f, i) => {
      // console.log(formValues[i].startDate);
      await axios
        .post(
          "/license/create",
          JSON.stringify({
            startDate: formValues[i].startDate,
            endDate: formValues[i].endDate,
            employees: [{ name: "ali", nationalCode: "0037548954" }],
          }),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        )
        .then((res) => {
          console.log("dooonnnneee");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
  return (
    <Box
      sx={{
        width: "45%",
        margin: "0 auto",
        overflow: "scroll",
        padding: "10px",
      }}
    >
      <form
        onSubmit={(e, i) => {
          console.log(i);
          handleSubmit(e, i);
        }}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <button onClick={addFormFields}>اضافه کردن فرم</button>
        <button onClick={handleSubmit}>save</button>

        {formValues.map((form, index) => (
          <>
            <div
              style={{
                margin: "15px",
                borderRadius: "5px",
                background: "rgba(218, 217, 217, 0.664)",
              }}
            >
              <Stack
                display={"flex"}
                direction={"row"}
                justifyContent={"space-around"}
              >
                {""}
                <h5>{index + 1} - مشخصات فرد مراجعه کننده</h5>
                {formValues.length > 1 ? (
                  <Button size="small" onClick={removeFormFields}>
                    <DeleteIcon color="error"></DeleteIcon>
                  </Button>
                ) : null}
              </Stack>
              <TextField
                error={true}
                key={toString(index)}
                required
                variant="filled"
                name="nId"
                inputProps={{ style: { fontFamily: "vazir" } }}
                sx={{ margin: "10px" }}
                placeholder={"کد ملی"}
                value={form.nId || ""}
                onChange={(event) => handleFormChange(index, event)}
              />
              <TextField
                required
                name="name"
                variant="filled"
                sx={{ margin: "10px" }}
                value={form.name || ""}
                placeholder={"نام خانوادگی"}
                onChange={(event) => handleFormChange(index, event)}
              />
              <DatePickerPersian
                value={form.startDate}
                onChange={(event) => {
                  handleFormChangeDatePicker(index, event, "startDate");
                }}
                label="ساعت ورود"
              />
              <DatePickerPersian
                value={form.endDate || ""}
                onChange={(event) => {
                  handleFormChangeDatePicker(index, event, "endDate");
                }}
                label="ساعت خروج"
              />
            </div>
          </>
        ))}
      </form>
    </Box>
  );
};
export default Newlicence;
