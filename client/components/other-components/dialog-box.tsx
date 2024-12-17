"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
interface DialogBoxProps {
  children: React.ReactNode;
  dialogTitle: string;
  dialogDesc?: string;
  triggerType: "add" | "edit" | "custom";
  customTrigger?: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const DialogBox: React.FC<DialogBoxProps> = ({
  children,
  dialogDesc,
  dialogTitle,
  triggerType,
  customTrigger,
  open,
  setOpen,
}) => {
  let dialogTrigger;
  switch (triggerType) {
    case "add":
      dialogTrigger = (
        <Button className="" type="button">
          {dialogTitle}
        </Button>
      );
      break;
    case "edit":
      dialogTrigger = (
        <Button className="" type="button">
          Edit
        </Button>
      );
      break;
    case "custom":
      dialogTrigger = customTrigger;
      break;
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="max-w-4xl"
      >
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDesc}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
export default DialogBox;
