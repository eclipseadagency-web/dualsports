"use client";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { deleteProductActions } from "../actions/deleteProductAction";
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
const DeleteProduct = ({ productId, productImages }) => {
  const [isPending, startTransition] = useTransition();
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button disabled={isPending} variant={"destructive"} asChild>
            <span>{isPending ? "Deleting..." : "Delete Product"}</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              product and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                startTransition(async () => {
                  await deleteProductActions(productId, productImages);
                  toast("product has been deleted successfully");
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

export default DeleteProduct;
