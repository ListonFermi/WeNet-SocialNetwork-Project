"use client";
import adsService from "@/utils/apiCalls/admin/adsService";
import { formatDate } from "@/utils/formatString";
import {
  Button,
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
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
// import AlertDialog from "./AlertDialog";
import { toastOptions } from "@/utils/toastOptions";
import "react-toastify/dist/ReactToastify.css";
import AlertDialog from "./AlertDialog";
import userService from "@/utils/apiCalls/admin/userService";

function WeNetTickManagementTable() {
  const [requestsData, setRequestsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [documentCount, setdocumentCount] = useState(0);
  const [rowsPerPage] = useState(10);
  const [changed, setChanged] = useState(false);
  const [statusValue, setStatusValue] = useState<
    "approved" | "rejected" | "pending"
  >("pending");

  useEffect(() => {
    (async function (currentPage: number, rowsPerPage: number) {
      try {
        // const [responseFormat, documentCount] =
        //   await adsService.getAdsManagementData(currentPage, rowsPerPage);
        //   await .getAdsManagementData(currentPage, rowsPerPage);
        const [responseFormat, documentCount] =
          await userService.getTickRequestsData(currentPage, rowsPerPage);

        setRequestsData(responseFormat);
        setdocumentCount(documentCount);
      } catch (error: any) {
        alert(error.message);
      }
    })(currentPage, rowsPerPage);
  }, [currentPage, changed]);

  function handlePageChange(event: any, value: any) {
    setCurrentPage(value);
  }

  const handleStatusChange = (e: any) => {
    setStatusValue(e.target.value);
  };

  async function changeStatus(requestId: string, userId: string) {
    try {
      if (statusValue === "pending")
        throw new Error("Selected status value not found");
      console.log("came here");
      await toast.promise(
        userService.changeTickRequestStatus(requestId, statusValue, userId),
        {
          pending: {
            render() {
              return "Loading";
            },
            icon: false,
          },
          success: {
            render({ data }) {
              return `Status Changed successfully`;
            },
          },
          error: {
            render({ data }) {
              return "Error Changing status";
            },
          },
        },
        toastOptions
      );
      setChanged((changed) => !changed);
    } catch (error: any) {
      toast.error(error.message, toastOptions);
    }
  }

  return (
    <>
      <ToastContainer />
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
                Requested On
              </TableCell>
              <TableCell align="center" className="font-bold">
                Document
              </TableCell>
              <TableCell align="center" className="font-bold">
                Description
              </TableCell>
              <TableCell align="center" className="font-bold">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requestsData.map((data) => {
              const {
                sNo,
                requestId,
                userId,
                username,
                firstName,
                lastName,
                profilePicUrl,
                imageUrl,
                description,
                status,
                createdAt,
              } = data;

              return (
                <TableRow key={requestId}>
                  <TableCell align="center">{sNo}</TableCell>
                  <TableCell align="center">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-center">
                        <a
                          href={`/profile/${username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image
                            src={profilePicUrl}
                            alt={"Profile Image"}
                            width={75}
                            height={75}
                          />
                        </a>
                      </div>
                      <div className="flex flex-col">
                        <a
                          href={`/profile/${username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="flex">
                            <h1 className="font-bold">{`${firstName} ${lastName}`}</h1>
                          </div>
                        </a>
                        <a
                          href={`/profile/${username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="mt-1 font-semibold">{`@${username}`}</div>
                        </a>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="center">{formatDate(createdAt)}</TableCell>
                  <TableCell align="center">
                    <Button
                      color="primary"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = imageUrl;
                        link.target = "_blank";
                        link.download = "image.jpg"; // You can set a custom filename here
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    >
                      View the document
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <div>
                      <h1>{description}</h1>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    {status === "pending" ? (
                      <>
                        <select
                          name="status"
                          id={`status-${requestId}`}
                          onChange={handleStatusChange}
                          value={statusValue}
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                        <AlertDialog
                          onConfirm={() => changeStatus(requestId,userId)}
                          alert="Are you sure you want to change the status of request?"
                        >
                          <button
                            className="bg-rootBg p-2 font-bold text-white hover:bg-rootBgH rounded-lg"
                            type="submit"
                          >
                            Submit
                          </button>
                        </AlertDialog>
                      </>
                    ) : (
                      <>
                        {status === "approved" ? (
                          <div className="flex flex-col items-center justify-center">
                            <Image
                              src={"/icons/wenetTick.png"}
                              alt="pending icon"
                              width={64}
                              height={64}
                            />
                            <p className="font-semibold mt-1">Approved</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center">
                            <Image
                              src={"/icons/rejected.png"}
                              alt="pending icon"
                              width={64}
                              height={64}
                            />
                            <p className="font-semibold mt-1">Rejected</p>
                          </div>
                        )}
                      </>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} alignItems="center" marginTop={2}>
        <Pagination
          count={Math.ceil(documentCount / rowsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          size="large"
        />
      </Stack>
    </>
  );
}

export default WeNetTickManagementTable;
