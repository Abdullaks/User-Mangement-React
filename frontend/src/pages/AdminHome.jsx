import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { deleteUser, getUser, reset } from "../features/admin/adminSlice";

function AdminHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const UserUpdate = (id) => {
    navigate(`/editUser/${id}`);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user && user.role === "user") {
      navigate("/login");
    }
    dispatch(getUser());

    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <>
      <h1>Welcome {user && user.name}</h1>
      <h2>User Details..</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">User Id</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Delete</TableCell>
              <TableCell align="center">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{user._id}</TableCell>
                <TableCell align="right">{user.name}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">
                  {" "}
                  <Button
                    onClick={() => dispatch(deleteUser(user._id))}
                    variant="contained"
                  >
                    Delete
                  </Button>
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <Button
                    onClick={() => {
                      UserUpdate(user._id);
                    }}
                    variant="contained"
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AdminHome;
