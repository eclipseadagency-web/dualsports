"use client";
import React, { useState, useTransition } from "react";
import { varitionsSchema } from "@/lib/validationSchema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { addSizeVariation } from "../actions/addVariation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const VariationForm = ({ variation }) => {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState();
  const form = useForm({
    resolver: zodResolver(varitionsSchema),
    defaultValues: {
      name: "",
    },
  });
  const handleSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);

    startTransition(async () => {
      const response = await addSizeVariation(formData, variation);
      if (response?.error) {
        setErrors(response.error);
        toast.error(response.error);
      } else {
        toast.success("variation has been created successfully");
        form.reset();
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{variation} name</FormLabel>
              <FormControl>
                <Input placeholder={`add ${variation}s  name`} {...field} />
              </FormControl>
              <FormDescription>
                if you want to add more {variation}s
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="mt-5">
          {isPending ? "Adding...." : "Add"}
        </Button>
      </form>
    </Form>
  );
};

export default VariationForm;
