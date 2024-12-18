"use client";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import React, { useTransition } from "react";
import { deleteVariation } from "../../variations/actions/deleteVariation";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteSubCategory } from "../actions/deleteSubCategory";
const DeleteSubCategory = ({ subCategory }) => {
  const [isPending, startTransition] = useTransition();
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant={"destructive"} size="small" disabled={isPending}>
            <XIcon size={20} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                startTransition(async () => {
                  await deleteSubCategory(subCategory.id);
                  toast.success("subCategory deleted");
                });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteSubCategory;
