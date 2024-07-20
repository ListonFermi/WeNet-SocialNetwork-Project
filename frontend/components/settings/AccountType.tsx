import { IUser } from "@/types/types";
import userService from "@/utils/apiCalls/userService";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import Image from "next/image";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import AlertDialog from "./AlertDialog";
import RequestWeNetTick from "./RequestWeNetTick/RequestWeNetTick";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AccountType({ currUser }: { currUser: IUser }) {
  if (!currUser) return;

  const [open, setOpen] = React.useState(false);
  const [isProfessional, setIsProfessional] = useState(
    currUser.accountType.isProfessional
  );
  const [accountType, setAccountType] = useState(
    isProfessional ? currUser.accountType.category : "personalAccount"
  );
  const [selectedValue, setSelectedValue] = useState(
    isProfessional ? currUser.accountType.category : "personalAccount"
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  const handleChangeAccountType = async () => {
    try {
      if (!selectedValue) return;
      const res = await toast.promise(
        userService.changeAccountType(selectedValue),
        {
          pending: "Changing account type",
          success: {
            render({ data }) {
              setAccountType(selectedValue);
              if (selectedValue === "celebrity" || selectedValue === "company")
                setIsProfessional(true);
              else setIsProfessional(false);
              setOpen(false);
              return `Success: ${data}`;
            },
          },
          error: {
            render({ data }) {
              return `Error: ${data}`;
            },
          },
        }
      );
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className=" overflow-y-auto no-scrollbar w-full">
      <ToastContainer />
      <div className="bg-secColor h-72 w-full">
        <div className="h-[20%] flex items-center justify-center">
          <h1 className="text-white font-bold text-2xl hidden md:block">
            Account Type
          </h1>
        </div>
        <div className="w-full h-[50%] flex items-center justify-center">
          <Image
            src={`/icons/${
              isProfessional
                ? accountType === "celebrity"
                  ? "celebrity.png"
                  : "company.png"
                : "personalAccount.svg"
            }`}
            alt="Account Type"
            height={60}
            width={60}
          />
          <h1 className="text-white font-bold text-xl">
            {isProfessional
              ? accountType === "celebrity"
                ? "Professional Account : Creator/Celebrity"
                : "Professional Account : Company/Institution"
              : "Personal Account"}
          </h1>
        </div>
        <div className="w-full h-[5%] flex items-center justify-center">
          <button
            onClick={handleClickOpen}
            className="p-2 bg-rootBg rounded-lg text-white font-bold hover:bg-rootBgH"
          >
            Change account Type
          </button>
        </div>
      </div>
      <div className="bg-secColor h-48 w-full mt-2">
        <RequestWeNetTick />
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Change account type"}</DialogTitle>
        <DialogContent>
          <RadioGroup value={selectedValue} onChange={handleChange}>
            <FormControlLabel
              value="personalAccount"
              control={<Radio />}
              label="Personal Account"
            />
            <FormControlLabel
              value="celebrity"
              control={<Radio />}
              label="Professional Account: Creator/Celebrity"
            />
            <FormControlLabel
              value="company"
              control={<Radio />}
              label="Professional Account: Company/Institution"
            />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <AlertDialog
            onConfirm={handleChangeAccountType}
            alert={`Are you sure you want to change the account type to ${selectedValue} ?`}
          >
            <Button>Change account type</Button>
          </AlertDialog>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AccountType;
