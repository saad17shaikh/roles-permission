"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { formSubmit } from "@/lib/helpers";
// import { showingToast } from "@/lib/clientHelpers";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { MdDelete } from "react-icons/md";

interface DeleteMultipleRowsProps {
  selectedIds: string[];
  path: string;
  revPath: string;
  setIds: any;
  setRowSelection: any;
}
const DeleteMultipleRows = ({
  selectedIds,
  path,
  revPath,
  setIds,
  setRowSelection,
}: DeleteMultipleRowsProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  // const handleDelete = () => {
  //   startTransition(() => {
  //     formSubmit({
  //       url: path,
  //       request: "DELETE",
  //       formData: { selectedIds },
  //       revPath,
  //     }).then((data) => {
  //       showingToast({ data, setOpen });
  //       data.success && setIds([]);
  //       data.success && setRowSelection({});
  //       // router.refresh()
  //     });
  //   });
  // };
  return (
    <>
      <Dialog open={open} onOpenChange={() => setOpen(true)}>
        <DialogTrigger className="disabled:hover:cursor-not-allowed">
          <div className="bg-main-color hover:bg-main-color-foreground p-2 rounded-md duration-300">
            <MdDelete className="w-6 h-6 font-extrabold text-white" />
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-2xl dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-3xl text-gray-800 dark:text-gray-300 text-center">
              Are you sure you want to delete ?
            </DialogTitle>
            <DialogDescription className="text-base text-center tracking-wider text-gray-800/70 font-medium dark:text-gray-400">
              {`This action cannot be undone. ${selectedIds?.length} items will be deleted.`}
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-between w-[60%] mx-auto mt-5">
            <Button
              className="px-12 py-6 text-lg capitalize bg-main-color text-white hover:bg-main-color-foreground transition-all duration-300"
              // onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? "deleting..." : " delete"}
            </Button>
            <Button
              className="px-12 py-6 text-lg capitalize bg-cyan-600 text-white hover:bg-cyan-500 transition-all duration-300"
              onClick={() => setOpen(false)}
            >
              cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteMultipleRows;
