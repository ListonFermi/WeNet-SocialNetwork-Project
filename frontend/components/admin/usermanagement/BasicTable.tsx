"use client";
import * as React from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Bounce, ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { USER_SERVICE_URL } from "@/utils/constants";

const toastOptions: ToastOptions = {
  position: "top-center",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Bounce,
};

// Define the columns for the user management table
interface Column {
  id:
    | "username"
    | "fullName"
    | "email"
    | "accountStatus"
    | "privacy"
    | "followersCount"
    | "followingCount"
    // | "postsCount";
  // | "actions";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "username", label: "Username", minWidth: 100 },
  { id: "fullName", label: "Full Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "accountStatus", label: "Status", minWidth: 100, align: "center" },
  { id: "privacy", label: "Privacy", minWidth: 100, align: "center" },
  {
    id: "followersCount",
    label: "Followers",
    minWidth: 100,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "followingCount",
    label: "Following",
    minWidth: 100,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  // {
  //   id: "postsCount",
  //   label: "Posts",
  //   minWidth: 100,
  //   align: "right",
  //   format: (value: number) => value.toLocaleString("en-US"),
  // },
  // { id: "actions", label: "Actions", minWidth: 150, align: "center" },
];

// Sample data for the table rows
interface Data {
  username: string;
  fullName: string;
  email: string;
  accountStatus: string;
  privacy: string;
  followersCount: number;
  followingCount: number;
  // actions: string;
}

function createData(
  username: string,
  fullName: string,
  email: string,
  accountStatus: string,
  privacy: string,
  followersCount: number,
  followingCount: number
): Data {
  // const actions = "Restrict";
  return {
    username,
    fullName,
    email,
    accountStatus,
    privacy,
    followersCount,
    followingCount,
    // actions,
  };
}

export default function AdminUserManagementTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState<Data[]>([]);

  React.useEffect(() => {
    (async function grabData() {
      const userServiceUrl = USER_SERVICE_URL;
      try {
        let response: any = await axios.get(
          `${userServiceUrl}/admin/usermanagement`,
          { withCredentials: true }
        );
        const users = response.data.map((user: any) =>
          createData(
            user.username,
            `${user.firstName} ${user.lastName}`,
            user.email,
            user.isRestricted ? "Restricted" : "Unrestricted",
            user.isPrivate ? "Private" : "Public",
            user.followers.length,
            user.following.length
          )
        );
        setRows(users);
      } catch (error: any) {
        const errorMessage =
          error.response && error.response.data
            ? error.response.data
            : "Failed get user data";
        toast.error(errorMessage, toastOptions);
      }
    })();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!rows.length)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">Loading...</h1>
      </div>
    );

  return (
    <>
      <ToastContainer />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.username}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
