import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import Stack from "@mui/joy/Stack";
import { TextareaAutosize } from "@mui/material";
import { toast } from "react-toastify";
import { toastOptions } from "@/utils/toastOptions";
import postService from "@/utils/apiCalls/postService";

type props = {
  commentId: string;
  currComment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
};

export default function EditComment(props: props) {

  const { commentId, currComment, setComment, setAnchorEl } = props;
  
  const [open, setOpen] = React.useState<boolean>(false);
  const [commentText, setCommentText] = React.useState<string>(currComment);

  async function handleSubmitEditComment(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      //   console.log(commentText);
      const response = await toast.promise(
        postService.editComment(commentId, commentText),
        {
          pending: "Editing the comment",
          success: "Edited your comment successfully",
          error: "Failed to edit the comment",
        },
        toastOptions
      );

      setComment(commentText);
      setAnchorEl(null);
      setOpen(false);
    } catch (error) {}
  }

  return (
    <React.Fragment>
      <button
        onClick={() => setOpen(true)}
        className=" text-white font-bold hover:bg-secColorH p-2"
      >
        Edit
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Edit Comment</DialogTitle>
          <form onSubmit={handleSubmitEditComment}>
            <Stack spacing={2}>
              <FormControl>
                <TextareaAutosize
                  autoFocus
                  required
                  onChange={(e) => setCommentText(e.currentTarget.value)}
                  value={commentText}
                />
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
