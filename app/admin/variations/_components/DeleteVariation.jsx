"use client";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { XIcon } from "lucide-react";
import { deleteVariationAction } from "../actions/deleteVariAction";
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
const DeleteVariation = ({ variationId, variation }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="outline" size="small" disabled={isPending}>
            <XIcon color="red" className="cursor-pointer" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              all product that has that size
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                startTransition(async () => {
                  const response = await deleteVariationAction(
                    variationId,
                    variation
                  );
                  if (response?.error) {
                    toast.error(response?.error);
                  } else {
                    toast.success("variation was deleted successfully");
                  }
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

export default DeleteVariation;
