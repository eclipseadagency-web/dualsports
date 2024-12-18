"use client";
import { editOrderSchema } from "@/lib/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
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
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { editOrderAction } from "./actions/editOrderAction";
import { useRouter } from "next/navigation";

const EditOrderForm = ({ status, orderId }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(editOrderSchema),
    defaultValues: {
      status: "",
    },
  });
  const onSubmit = (values) => {
    startTransition(async () => {
      await editOrderAction(values, orderId);
      toast.success("order has been updated succfully");
      router.push("/admin/order");
    });
  };
  const statusArray = [
    "PENDING",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
    "RETURNED",
  ];
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={status}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select order status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {statusArray.map((s, i) => (
                    <SelectItem value={s} key={i}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} type="submit" className="mt-4">
          Edit order
        </Button>
      </form>
    </Form>
  );
};

export default EditOrderForm;
