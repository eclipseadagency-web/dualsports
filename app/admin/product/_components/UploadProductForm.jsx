"use client";
import { uploadExcelSheet } from "@/lib/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { uploadExcelProducts } from "../actions/uploadExcelProducts";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const UploadProductForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(uploadExcelSheet),
    defaultValues: {
      file: "",
    },
  });
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("file", data.file);

    startTransition(async () => {
      await uploadExcelProducts(formData);
      toast.success("products upload successfully");
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload excel sheet</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => {
                    // Capture the selected file
                    const selectedFile = e.target.files?.[0] || null;
                    // Manually trigger the onChange event with the selected file
                    field.onChange(selectedFile);
                  }}
                  ref={field.ref} // Ensure the input is properly registered
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-3">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </Button>
          <Button asChild>
            <Link
              href={"/products_template.xlsx"}
              download={"products_template"}
            >
              Download template sheet
            </Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UploadProductForm;
