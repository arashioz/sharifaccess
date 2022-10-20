import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import "./Userlist.css";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Button } from "@mui/material";
import Popup from "./Popup/Popup";

export default function Userlist() {
  const { auth } = useAuth();
  const [rows, setRows] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    getData();
  }, [users, rows]);

  async function getData() {
    const config = {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    };
    await axios.get("/user/usersList", config).then((r, idx) => {
      let data = r.data;
      setUsers(data);
      let allRows = [];
      data.forEach((i, idx) => {
        allRows.push({
          uniqId: i._id,
          id: idx + 1,
          nId: i.nationalCode,
          fullName: i.name,
          phoneNumber: i.phoneNumber,
          request: i.requests,
          isAdmin: i.isAdmin ? (
            <CheckOutlinedIcon color="success" />
          ) : (
            <ClearOutlinedIcon sx={{ color: "red" }} />
          ),
        });
      });
      setRows(allRows);
    });
  }

  const deleteHandle = async (id) => {
    const selectUSr = rows.find((r) => r.id === id);
    const founduser = users.find((u) => {
      return selectUSr.nId === u.nationalCode;
    });
    await axios
      .post(
        "/user/removeUser",
        JSON.stringify({
          userId: founduser._id,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <TableContainer
      className="main-tabel"
      sx={{
        minWidth: 650,
        height: "100%",
        width: "100%",
        backgroundColor: "rgb(255 255 255 / 32%)",
        border: "none",
        borderRadius: "10px",
        padding: "0px",
        maxHeight: "90%",
      }}
      component={Paper}
    >
      <Table className="main-tabel" aria-label="simple table">
        <TableHead className="main-tabel">
          <TableRow>
            <TableCell className="main-tabel" align="right" width={20}>
              شناسه
            </TableCell>
            <TableCell className="main-tabel" align="center">
              نام کامل
            </TableCell>
            <TableCell className="main-tabel" align="center">
              کد ملی
            </TableCell>
            <TableCell className="main-tabel" align="center">
              شماره همراه
            </TableCell>
            <TableCell className="main-tabel" align="center">
              مجوزها
            </TableCell>
            <TableCell className="main-tabel" align="center">
              ادمین
            </TableCell>
            <TableCell className="main-tabel" align="center">
              عملیات
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="main-tabel" align="center">
                {row.id}
              </TableCell>
              <TableCell className="main-tabel" align="center">
                {row.fullName}
              </TableCell>
              <TableCell className="main-tabel" align="center">
                {row.nId}
              </TableCell>
              <TableCell className="main-tabel" align="center">
                {row.phoneNumber}
              </TableCell>
              <TableCell className="main-tabel" align="center" width={5}>
                {row.request.length}
              </TableCell>
              <TableCell className="main-tabel" align="center">
                {row.isAdmin}
              </TableCell>
              <TableCell className="main-tabel" align="center" width={3}>
                <Popup
                  btnText={<DeleteOutlineOutlinedIcon sx={{ color: "red" }} />}
                  text={` ایا با حذف "${row.fullName}" موافق هستید ؟ `}
                  deleteHandle={() => deleteHandle(row.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
