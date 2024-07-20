import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import Stack from "@mui/joy/Stack";
import userService from "@/utils/apiCalls/userService";
import { toast } from "react-toastify";
import { toastOptions } from "@/utils/toastOptions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BasicModalDialog() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<{
    description: string;
    image: File | null;
  }>({
    description: "",
    image: null,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("description", formData.description);

    if (formData.image) {
      formDataToSubmit.append("image", formData.image);
    }

    try {
      const data = await toast.promise(
        userService.requestWenetTick(formDataToSubmit),
        {
          pending: "Submitting your document",
          success: "Document submitted successfully",
          error: "failed to send document",
        },
        toastOptions
      );
      console.log({ data });
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message, toastOptions);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files ? files[0] : null,
      }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <Button variant="outlined" color="success" onClick={() => setOpen(true)}>
        Submit documents
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Document of proof</DialogTitle>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>
                Upload your Aadhaar card or any ID proof to confirm your
                identity
              </FormLabel>
              <input
                type="file"
                name="image"
                accept="image/*"
                required
                onChange={handleInputChange}
              />
            </FormControl>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  required
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
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
