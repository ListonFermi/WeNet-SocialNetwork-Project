"use client";
import * as React from "react";
import Popover from "@mui/material/Popover";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AlertDialog from "@/components/settings/AlertDialog";
import { Bounce, ToastOptions, toast } from "react-toastify";
import postService from "@/utils/apiCalls/postService";
import "react-toastify/dist/ReactToastify.css";
import { IPost, IUser } from "@/types/types";

type prop = {
  postData: IPost;
  currUserData?: IUser;
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

export default function BasicPopover(props: prop) {
  const { postData, currUserData } = props;

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const router = useRouter();

  const postId = postData._id;
  const isOwnPost = postData.userId === currUserData?._id;

  const isProfessionalAccount =
    currUserData?.accountType.isProfessional || false;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      const res: any = await toast.promise(
        postService.deletePost(postId),
        {
          pending: "Deleting post",
          success: "Post deleted successfully",
          error: "Failed to delete post",
        },
        toastOptions
      );
      router.push("/");
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
          className="h-8 w-8 mt-4 justify-end cursor-pointer"
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
        {isOwnPost ? (
          <div className="flex flex-col md:h-30 md:w-40 w-20 h-30 justify-center bg-black shadow-rootBg shadow-lg ">
            <button
              className=" text-white font-bold hover:bg-secColorH p-2"
              onClick={() => router.push(`/post/edit/${postId}`)}
            >
              Edit
            </button>
            <AlertDialog
              onConfirm={handleDelete}
              alert="Do you really wanna delete this post ?"
            >
              <button className=" text-white font-bold hover:bg-secColorH p-2">
                Delete
              </button>
            </AlertDialog>
            {isProfessionalAccount && (
              <button
                className=" text-white font-bold hover:bg-secColorH p-2"
                onClick={() => router.push(`/post/promote/${postId}`)}
              >
                Promote Post
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col md:h-20 md:w-40 w-20 h-40 justify-center bg-black shadow-rootBg shadow-lg ">
            <button className=" text-white font-bold hover:bg-secColorH p-2">
              Copy Link
            </button>
            <button
              className=" text-white font-bold hover:bg-secColorH p-2"
              onClick={() => router.push(`/post/report/${postId}`)}
            >
              Report
            </button>
          </div>
        )}
      </Popover>
    </>
  );
}
