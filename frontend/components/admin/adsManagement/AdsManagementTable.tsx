"use client";
import adsService from "@/utils/apiCalls/admin/adsService";
import { formatDate } from "@/utils/formatString";
import {
  Box,
  Card,
  Modal,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import AlertDialog from "./AlertDialog";
import { toastOptions } from "@/utils/toastOptions";
import "react-toastify/dist/ReactToastify.css";

function AdsManagementTable() {
  const [adsData, setAdsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [documentCount, setdocumentCount] = useState(0);
  const [rowsPerPage] = useState(5);
  const [changed, setChanged]= useState(false)

  useEffect(() => {
    (async function (currentPage: number, rowsPerPage: number) {
      try {
        const [responseFormat, documentCount] =
          await adsService.getAdsManagementData(currentPage, rowsPerPage);
        setAdsData(responseFormat);
        setdocumentCount(documentCount);
      } catch (error: any) {
        alert(error.message);
      }
    })(currentPage, rowsPerPage);
  }, [currentPage,rowsPerPage,changed]);

  function handlePageChange(event: any, value: any) {
    setCurrentPage(value);
  }

  async function toggleStatus(postId: string) {
    try {
      await toast.promise(
        adsService.toggleStatus(postId),
        {
          pending: {
            render(){
              return "Loading"
            },
            icon: false,
          },
          success: {
            render({data}){
              return `${data}`
            },
          },
          error: {
            render({data}){
              return 'Error Toggling status'
            }
          }
        },
        toastOptions
      );
      setChanged((changed)=>!changed)
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
                Advertisement Id
              </TableCell>
              <TableCell align="center" className="font-bold">
                Username
              </TableCell>
              <TableCell align="center" className="font-bold">
                Post
              </TableCell>
              <TableCell align="center" className="font-bold">
                PayU Transaction Id
              </TableCell>
              <TableCell align="center" className="font-bold">
                Transaction Amount
              </TableCell>
              <TableCell align="center" className="font-bold">
                Transaction Date
              </TableCell>
              <TableCell align="center" className="font-bold">
                Ad Expires On
              </TableCell>
              <TableCell align="center" className="font-bold">
                Active/Inactive
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adsData.map((data) => {
              const {
                sNo,
                advertisementId,
                username,
                postImageUrl,
                postId,
                transactionId,
                expiresOn,
                PayUTransactionId,
                transactionAmount,
                transactionDate,
                isActive,
              } = data;

              return (
                <TableRow key={advertisementId}>
                  <TableCell align="center">{sNo}</TableCell>
                  <TableCell align="center">{advertisementId}</TableCell>
                  <TableCell align="center">{username}</TableCell>
                  <TableCell align="center">
                    <a
                      href={`/post/${postId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={postImageUrl}
                        alt={"Post Image"}
                        width={50}
                        height={50}
                      />
                    </a>
                  </TableCell>
                  <TableCell align="center">
                    <a
                      href={`https://payu.in/business/transactions/${PayUTransactionId}`}
                      target="_blank"
                      className="text-blue-400"
                    >
                      {PayUTransactionId}
                    </a>
                  </TableCell>
                  <TableCell align="center">₹{transactionAmount}</TableCell>
                  <TableCell align="center">
                    {formatDate(transactionDate)}
                  </TableCell>
                  <TableCell align="center">{formatDate(expiresOn)}</TableCell>
                  <TableCell align="center">
                    <AlertDialog
                      onConfirm={()=>toggleStatus(postId)}
                      alert="Are you sure you want to change the status of this ad?"
                    >
                      <button
                        className={`${
                          isActive ? "bg-rootBg" : "bg-red-500"
                        } hover:${
                          isActive ? "bg-rootBgH" : "bg-red-400"
                        } p-2 text-md text-white font-semibold rounded-lg`}
                      >
                        {isActive ? "Active" : "Inactive"}
                      </button>
                    </AlertDialog>
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

export default AdsManagementTable;
