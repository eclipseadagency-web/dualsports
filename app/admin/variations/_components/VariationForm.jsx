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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
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
      size_type: "",
    },
  });
  const sizeType = ["clothing", "kids", "shoes"];
  const handleSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("size_type", data.size_type);

    startTransition(async () => {
      const response = await addSizeVariation(formData);
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
              <FormLabel>Size name</FormLabel>
              <FormControl>
                <Input placeholder={`add ${variation}s  name`} {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="size_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>size type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {sizeType.map((type, i) => (
                    <SelectItem value={type} key={i}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

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
