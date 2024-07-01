"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { Card } from "@mui/material";
import postService from "@/utils/apiCalls/postService";
import AlertDialog from "@/components/settings/AlertDialog";
import { toastOptions } from "@/utils/toastOptions";
import "react-toastify/dist/ReactToastify.css";
import { formatDate } from "@/utils/formatString";

type Report = {
  _id: string;
  date: string;
  reportedBy: string;
  entityType: "posts" | "comments" | "users";
  entity: { entityId: string; imageUrl?: string };
  entityId : string;
  entityImage: string;
  type: string;
  description: string;
  isResolved: boolean;
};

export default function ReportManagementTable() {
  const [reports, setReports] = React.useState<Report[]>();
  const [changed, setChanged] = React.useState(false);
  const router = useRouter();

  const handleChangeStatus = async (id: string) => {
    try {
      // const { data } = await axiosInstance.put(
      //   `/api/auction/auction-status/${id}`
      // );
      // if (data.success) {
      //   toast.success("status changed successfully");
      //   setDataChange(!dataChange);
      // }
    } catch (error) {
      toast.error("failed to change status");
    }
  };

  React.useEffect(() => {
    (async function () {
      try {
        let reports = await postService.getReportManagementData();
        reports = reports.map((report: any) => {
          const {
            _id,
            entityType,
            entityId,
            reportedBy,
            reportType,
            reportDescription,
            updatedAt,
            isResolved,
          } = report;
          return {
            _id,
            date: formatDate(updatedAt),
            reportedBy: reportedBy.username,
            entityType,
            entity: { entityId: entityId._id, imageurl: entityId.imageUrl },
            entityId: entityId._id,
            entityImage: entityId.imageUrl,
            type: reportType,
            description: reportDescription,
            isResolved,
          };
        });
        setReports(reports);
      } catch (error: any) {
        toast.error(error);
      }
    })();
  }, [changed]);

  async function handleDelete(
    reportId: string,
    entityType: "posts" | "comments" | "users",
    entityId: string
  ) {
    try {
      if (entityType === "posts") await postService.deletePostByAdmin(entityId);
      // if(entityType === 'comments') await postService.deleteComment(entityId)

      const res: any = await toast.promise(
        postService.resolveReport(reportId),
        {
          pending: "Deleting the entity",
          success: "Entity deleted successfully",
          error: "Error deleting the entity",
        },
        toastOptions
      );
      setChanged(!changed);
    } catch (error: any) {
      toast.error(error.message, toastOptions);
    }
  }
  async function handleCloseReport(reportId: string) {
    try {
      await toast.promise(
        postService.resolveReport(reportId),
        {
          pending: "Closing the report",
          success: "Report resolved successfully",
          error: "Error closing the report",
        },
        toastOptions
      );
      setChanged(!changed);
    } catch (error: any) {
      toast.error(error.message, toastOptions);
    }
  }

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Auctions</h1>
      </div>
      <TableContainer component={Card}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Date & Time</TableCell>
              <TableCell align="center">Reported By</TableCell>
              <TableCell align="center">Entity Type</TableCell>
              <TableCell align="center">Entity</TableCell>
              <TableCell align="center">Report Type</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {reports?.map((report) => (
              <TableRow key={report._id}>
                <TableCell align="center">{report.date}</TableCell>
                <TableCell align="center">@{report.reportedBy}</TableCell>
                <TableCell align="center">
                  {report.entityType === "posts" && "Post"}
                  {report.entityType === "comments" && "Comment"}
                  {report.entityType === "users" && "User"}
                </TableCell>
                <TableCell align="center">
                  {report.entityType == "posts" && report.entityImage && (
                    <Image
                      src={report.entityImage}
                      alt={"Post Image"}
                      width={50}
                      height={50}
                    />
                  )}
                </TableCell>
                <TableCell align="center"> {report.type} </TableCell>
                <TableCell align="left">
                  {" "}
                  <p className="text-xs">{report.description}</p>{" "}
                </TableCell>
                <TableCell align="left">
                  {report.isResolved ? (
                    <Image
                      src={"/icons/admin/reportsManagementResolved.png"}
                      alt="Resolved"
                      width={60}
                      height={50}
                    />
                  ) : report.entityType === "users" ? (
                    <></>
                  ) : (
                    <div className="flex flex-col">
                      <AlertDialog
                        onConfirm={() =>
                          handleDelete(
                            report._id,
                            report.entityType,
                            report.entity.entityId
                          )
                        }
                        alert="Do you really want to delete the post?"
                      >
                        <button className="bg-red-400 p-1 text-xs font-semibold rounded-lg">
                          Delete Post
                        </button>
                      </AlertDialog>
                      <AlertDialog
                        onConfirm={() => handleCloseReport(report._id)}
                        alert="Do you really wanna close this report ?"
                      >
                        <button className="bg-blue-500 p-1 mt-1 text-xs font-semibold rounded-lg">
                          Close Report
                        </button>
                      </AlertDialog>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
