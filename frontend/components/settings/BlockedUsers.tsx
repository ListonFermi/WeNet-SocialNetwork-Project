import userService from "@/utils/apiCalls/userService";
import {
  Card,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AlertDialog from "./AlertDialog";
import { toastOptions } from "@/utils/toastOptions";
import NoUsersBlocked from "./NoUsersBlocked";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function BlockedUsers() {
  const [blockedUsersData, setBlockedUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [documentCount, setdocumentCount] = useState(0);
  const [rowsPerPage] = useState(5);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    (async function (currentPage: number, rowsPerPage: number) {
      try {
        const [responseFormat, documentCount] =
          await userService.getBlockedUsers(currentPage, rowsPerPage);
        setBlockedUsersData(responseFormat);
        setdocumentCount(documentCount);
      } catch (error: any) {
        alert(error.message);
      }
    })(currentPage, rowsPerPage);
  }, [currentPage, changed]);

  function handlePageChange(event: any, value: any) {
    setCurrentPage(value);
  }

  async function unblock(userId: string) {
    try {
      toast.promise(
        userService.blockUser(userId),
        {
          pending: "Unblocking user",
          success: "User unblocked successfully",
          error: "Failed to block user",
        },
        toastOptions
      );
      setChanged((changed) => !changed);
    } catch (error: any) {
      toast.error(error.message, toastOptions);
    }
  }

  if (blockedUsersData.length === 0) {
    return (
      <>        <div className="h-full w-full flex flex-col items-center justify-center bg-secColor">
          <div className="h-[10%] w-full">
            <h1 className="flex font-bold text-white text-xl items-center justify-center">
              Blocked Users
            </h1>
          </div>
          <div>
            <Image
              src="/icons/noUsersBlocked.png"
              alt="No users blocked"
              width={150}
              height={150}
            />
            <div>
                <h1 className="font-semibold text-white">You haven't blocked any users yet!</h1>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="h-full w-full flex flex-col items-center justify-center bg-secColorH">
        <div className="h-[10%] w-full">
          <h1 className="flex font-bold text-xl items-center justify-center">
            Blocked Users
          </h1>
        </div>
        <div className="h-[90%] w-[80%]">
          <ToastContainer />
          <ThemeProvider theme={darkTheme}>
            <TableContainer component={Card}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className="font-bold">
                      S No
                    </TableCell>
                    <TableCell align="center" className="font-bold">
                      User
                    </TableCell>
                    <TableCell align="center" className="font-bold">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {blockedUsersData.map((data) => {
                    const { sNo, _id, profilePicUrl, username } = data;
                    return (
                      <TableRow key={_id}>
                        <TableCell align="center" className="font-semibold">
                          {sNo}
                        </TableCell>
                        <TableCell align="center">
                          <div className="flex items-center justify-center ">
                            <a
                              href={`/profile/${username}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Image
                                src={profilePicUrl}
                                alt={"Post Image"}
                                width={50}
                                height={50}
                              />
                            </a>
                            <a
                              className="py-2 font-bold px-2"
                              href={`/profile/${_id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              @{username}
                            </a>
                          </div>
                        </TableCell>
                        <TableCell align="center">
                          <AlertDialog
                            onConfirm={() => unblock(_id)}
                            alert={`Are you sure you want to change the unblock ${username}?`}
                          >
                            <button className="p-2 bg-rootBg hover:bg-rootBgH rounded-lg text-white font-semibold">
                              Unblock
                            </button>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </ThemeProvider>
          <ThemeProvider theme={darkTheme}>
            <Stack spacing={2} alignItems="center" marginTop={2}>
              <Pagination
                count={Math.ceil(documentCount / rowsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                size="large"
              />
            </Stack>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}

export default BlockedUsers;
