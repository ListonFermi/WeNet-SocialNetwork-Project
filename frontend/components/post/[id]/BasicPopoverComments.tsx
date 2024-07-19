"use client";
import * as React from "react";
import Popover from "@mui/material/Popover";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AlertDialog from "@/components/settings/AlertDialog";
import { Bounce, ToastOptions, toast } from "react-toastify";
import postService from "@/utils/apiCalls/postService";
import "react-toastify/dist/ReactToastify.css";
import EditComment from "./EditComment";

type prop = {
  commentId: string;
  isOwnComment: boolean;
  currComment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
};

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

export default function BasicPopoverComments({
  commentId,
  isOwnComment,
  currComment,
  setComment,
}: prop) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      const res: any = await toast.promise(
        postService.deleteComment(commentId),
        {
          pending: "Deleting comment",
          success: "Comment deleted successfully",
          error: "Failed to delete comment",
        },
        toastOptions
      );
    } catch (error: any) {
      console.error(error);
      const errorMessage = error?.response?.data?.length
        ? error.response.data
        : "Internal server error";
      toast.error(errorMessage, toastOptions);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <button onClick={handleClick}>
        <Image
          src="/icons/menu.svg"
          alt=""
          width={150}
          height={150}
          className="h-8 w-8 justify-end cursor-pointer"
        />
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {isOwnComment ? (
          <div className="flex flex-col md:h-20 md:w-40 w-20 h-40 justify-center bg-black shadow-rootBg shadow-lg ">
            <EditComment
              commentId={commentId}
              currComment={currComment}
              setComment={setComment}
              setAnchorEl={setAnchorEl}
            />
            <AlertDialog
              onConfirm={handleDelete}
              alert="Do you really wanna delete this comment ?"
            >
              <button className=" text-white font-bold hover:bg-secColorH p-2">
                Delete
              </button>
            </AlertDialog>
          </div>
        ) : (
          <div className="flex flex-col md:h-20 md:w-40 w-20 h-40 justify-center bg-black shadow-rootBg shadow-lg ">
            <button className=" text-white font-bold hover:bg-secColorH p-2">
              Copy Link
            </button>
            <button
              className=" text-white font-bold hover:bg-secColorH p-2"
              //   onClick={() => router.push(`/post/report/${postId}`)}
            >
              Report
            </button>
          </div>
        )}
      </Popover>
    </>
  );
}
