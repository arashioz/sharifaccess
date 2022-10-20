import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import clsx from "clsx";

const columns = [
  { field: "id", headerName: "شناسه", width: 80, sortable: false },
  { field: "nId", headerName: "کد ملی", width: 120, sortable: false },
  ,
  {
    field: "fullName",
    headerName: "نام و نام خانوادگی",
    width: 200,
    editable: false,
    sortable: false,
  },
  {
    field: "phoneNumber",
    headerName: "شماره تماس",
    width: 150,
    editable: false,
    sortable: false,
    cellClassName: "isAdmin",
  },
  {
    field: "isAdmin",
    headerName: "کاربر ادمین",
    width: 120,
    editable: false,
    sortable: false,
    cellClassName: (params) => {
      if (params.value == null) {
        return "";
      }
      console.log(params);

      return clsx("super-app", {
        user: params.value === "کاربر",
        admin: params.value === "ادمین",
      });
    },
  },
  {
    feild: "remove",
    headerName: "عملیات",
    width: 100,
    editable: false,
    sortable: false,
  },
];

export default function UsersLis() {
  const { auth } = useAuth();
  const [rows, setRows] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getData();
    setIsLoading(false);
  }, []);

  async function getData() {
    const config = {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    };
    await axios.get("/user/usersList", config).then((r, idx) => {
      let data = r.data;
      let allRows = [];
      data.forEach((i, idx) => {
        allRows.push({
          id: idx + 1,
          nId: i.nationalCode,
          fullName: i.name,
          phoneNumber: i.phoneNumber,
          isAdmin: i.isAdmin ? "ادمین" : "کاربر",
        });
      });
      setRows(allRows);
    });
  }
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        "& .admin": {
          backgroundColor: "#1bc83a29",
          color: "black",
          fontWeight: "600",
        },
      }}
    >
      <DataGrid
        sx={{ fontFamily: "vazir", fontSize: 15 }}
        loading={isLoading}
        disableColumnMenu
        disableColumnFilter
        rows={rows}
        Panel
        columns={columns}
      />
    </Box>
  );
}
