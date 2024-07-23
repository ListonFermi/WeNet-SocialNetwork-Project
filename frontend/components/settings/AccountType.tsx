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
  const [open, setOpen] = useState(false);
  const [accountType, setAccountType] = useState(
    currUser.accountType.isProfessional ? currUser.accountType.category : "personalAccount"
  );
  const [accountTypeValue, setAccountTypeValue] = useState<any>(null)

  if (!currUser) return null;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccountTypeValue(event.target.value);
  };

  const handleChangeAccountType = async () => {
    try {
      if (!accountTypeValue) return;
      await toast.promise(
        userService.changeAccountType(accountTypeValue),
        {
          pending: "Changing account type",
          success: {
            render({ data }) {
              handleClose();
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
      setAccountType(accountTypeValue)
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const isProfessional = accountType === "celebrity" || accountType === "company";

  return (
    <div className="h-full overflow-y-auto no-scrollbar w-full">
      <ToastContainer />
      <div className={`bg-secColor ${isProfessional ? 'h-72' : 'h-full'} w-full`}>
        <div className="h-[20%] flex items-center justify-center">
          <h1 className="text-white font-bold text-2xl hidden md:block">Account Type</h1>
        </div>
        <div className="w-full h-[50%] flex items-center justify-center">
          <Image
            src={`/icons/${isProfessional ? (accountType === "celebrity" ? "celebrity.png" : "company.png") : "personalAccount.svg"}`}
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
      {isProfessional && (
        <div className="bg-secColor h-48 w-full mt-2">
          <RequestWeNetTick />
        </div>
      )}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Change account type</DialogTitle>
        <DialogContent>
          <RadioGroup value={accountTypeValue} onChange={handleChange}>
            <FormControlLabel value="personalAccount" control={<Radio />} label="Personal Account" />
            <FormControlLabel value="celebrity" control={<Radio />} label="Professional Account: Creator/Celebrity" />
            <FormControlLabel value="company" control={<Radio />} label="Professional Account: Company/Institution" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <AlertDialog
            onConfirm={handleChangeAccountType}
            alert={`Are you sure you want to change the account type to ${accountType}?`}
          >
            <Button>Change account type</Button>
          </AlertDialog>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AccountType;
