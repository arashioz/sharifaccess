import { Box } from "@mui/joy";
import { TextField } from "@mui/material";
import React, { createRef, useState } from "react";
import DatePickerPersian from "../datepicker/DatePickerPersian";
const Newlicence = () => {
  // const [value, setValue] = React.useState(Dayjs);
  const [formValues, setFormValues] = useState([
    {
      nId: { placeHolder: "کد ملی", value: "" },
      name: { placeHolder: "نام خانوادکی", value: "" },
      startDate: { placeHolder: "تاریخ شروع", value: "" },
      endDate: { placeHolder: "تاریخ پایان", value: "" },
    },
  ]);

  let handleChange = (i, e) => {
    console.log(e);
    // let newFormValues = [...formValues];
    // newFormValues[i][e.target.name] = e.target.value;
    // setFormValues(newFormValues);
  };

  function onChangeHandler(event) {
    let updateform = [...formValues];
    updateform[0][event.target.name].value = event.target.value;
    setFormValues(updateform);
  }

  let addFormFields = () => {
    setFormValues([
      ...formValues,
      {
        nId: { placeHolder: "کد ملی", value: "" },
        name: { placeHolder: "نام خانوادکی", value: "" },
        startDate: { placeHolder: "تاریخ شروع", value: "" },
        endDate: { placeHolder: "تاریخ پایان", value: "" },
      },
    ]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(formValues));
  };
  return (
    <Box
      sx={{
        width: "50%",
        margin: "0 auto",
        overflow: "scroll",
        padding: "10px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <button onClick={addFormFields}>add</button>
        <button onClick={handleSubmit}>save</button>

        {formValues.map((form, index) => (
          <>
            <TextField
              variant="filled"
              name="nId"
              inputProps={{ style: { fontFamily: "vazir" } }}
              sx={{ margin: "10px" }}
              placeholder={form.nId.placeHolder}
              value={form.nId.value || ""}
              onChange={(e) => onChangeHandler(e)}
            />
            <TextField
              name="name"
              variant="filled"
              sx={{ margin: "10px" }}
              value={form.name.value || ""}
              placeholder={form.name.placeHolder}
              onChange={(e) => onChangeHandler(e)}
              
            />
            <DatePickerPersian label="ساعت ورود" />
            {""}
            <DatePickerPersian label="ساعت خروج" />
          </>
        ))}
      </form>
    </Box>
  );
};
export default Newlicence;
