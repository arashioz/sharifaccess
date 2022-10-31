import { Box } from "@mui/joy";
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import DatePickerPersian from "../datepicker/DatePickerPersian";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { makeStyles } from "@mui/styles";
import { useFormInputValidation } from "react-form-input-validation";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    fontFamily: "inherit",
    color: "red",
  },
});
const Newlicence = () => {
  const [err, setErr] = useState([
    {
      nId: false,
      name: false,
      startDate: false,
      endDate: false,
    },
  ]);
  const [errmsg, setErrMsg] = useState([
    {
      nId: "",
      name: "",
      startDate: "",
      endDate: "",
    },
  ]);
  const [formValues, setFormValues] = useState([
    {
      nId: null,
      name: null,
      startDate: null,
      endDate: null,
    },
  ]);
  const { auth } = useAuth();

  const persianREGX = (value) => {
    const P_REGEX = new RegExp(/^[\u0600-\u06FF\s]+$/);
    return P_REGEX.test(value);
  };

  const handleFormChange = (index, event) => {
    let { value, name } = event.target;

    let data = [...formValues];

    data[index][name] = value;

    setFormValues(data);

    //error

    let errors = [...err];
    let errorsmessage = [...errmsg];

    if (!persianREGX(value)) {
      errors[index][name] = true;
      errorsmessage[index][name] = "لطفا از زبان فارسی استفاده کنید ";
      setErr(errors);
      setErrMsg(errorsmessage);
    } else {
      errors[index][name] = false;
      errorsmessage[index][name] = "";
      setErr(errors);
      setErrMsg(errorsmessage);
    }
  };

  const handleFormChangeDatePicker = (index, event, field) => {
    let data = [...formValues];
    data[index][field] = changeToISo(event._d);
  };

  let addFormFields = () => {
    setFormValues([
      ...formValues,
      {
        nId: null,
        name: null,
        startDate: null,
        endDate: null,
      },
    ]);
    setErr([
      ...err,
      {
        nId: false,
        name: false,
        startDate: false,
        endDate: false,
      },
    ]);
    setErrMsg([
      ...errmsg,
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

// const ValidationForm = () => {
//   const [fields, errors, form] = useFormInputValidation({
//     customer_name: "",
//     email_address: "",
//     phone_number: "",
//   }, {
//     customer_name: "required",
//     email_address: "required|email",
//     phone_number: "required|numeric|digits_between:10,12"
//   });


  let handleSubmitform = async (event, idx) => {
    event.preventDefault();
    formValues.forEach(async (f, i) => {
      await axios
        .post(
          "/license/create",
          JSON.stringify({
            startDate:
              formValues[i].startDate ,
            endDate: formValues[i].endDate,
            employees: [
              { name: formValues[i].name, nationalCode: formValues[i].nId },
            ],
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
          handleSubmitform(e, i);
        }}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <button onClick={addFormFields}>اضافه کردن فرم</button>
        <button type="submit">save</button>

        {formValues.map((form, index) => (
          <>
            <div
              key={index}
              style={{
                margin: "15px",
                borderRadius: "5px",
                background: "rgba(218, 217, 217, 0.664)",
              }}
            >
              <Stack
                key={index}
                display={"flex"}
                direction={"row"}
                sx={{ padding: "0px 10px" }}
                justifyContent={"space-between"}
              >
                {""}
                <h5>{index + 1} - مشخصات فرد مراجعه کننده</h5>
                {formValues.length > 1 ? (
                  <Button style={{ width: "10px" }} onClick={removeFormFields}>
                    <DeleteIcon color="error"></DeleteIcon>
                  </Button>
                ) : null}
              </Stack>
              <TextField
                error={err[index].nId}
                helperText={err[index].nId ? errmsg[index].nId : ""}
                variant="filled"
                name="nId"
                inputProps={{ style: { fontFamily: "vazir" } }}
                sx={{ margin: "10px" }}
                placeholder={"کد ملی"}
                value={form.nId || ""}
                onChange={(event) => handleFormChange(index, event)}
              />
              <TextField
                error={err[index].name}
                helperText={err[index].name ? errmsg[index].name : ""}
                required
                name="name"
                variant="filled"
                sx={{ margin: "10px" }}
                value={form.name || ""}
                placeholder={"نام خانوادگی"}
                onChange={(event) => handleFormChange(index, event)}
              />
              <DatePickerPersian
                error={err[index].startDate}
                helperText={err[index].startDate ? errmsg[index].startDate : ""}
                value={form.startDate}
                onChange={(event) => {
                  handleFormChangeDatePicker(index, event, "startDate");
                }}
                label="ساعت ورود"
              />
              <DatePickerPersian
                value={form.endDate}
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
