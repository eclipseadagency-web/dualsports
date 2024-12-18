"use client";
import { editVariationSchema } from "@/lib/validationSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { editVariationAction } from "../actions/editVariationAction";
import { toast } from "sonner";

const EditProductVariation = ({ variation }) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(editVariationSchema),
    defaultValues: {
      sale_price: String(variation.sale_price) || "",
      regular_price: String(variation.regular_price) || "",
      quantity: String(variation.quantity) || "",
      sku: variation.sku || "",
      bar_code: variation.bar_code || "",
    },
  });

  const handleSubmit = (data) => {
    const formData = new FormData();
    formData.append("regular_price", data.regular_price);
    formData.append("sale_price", data.sale_price);
    formData.append("quantity", data.quantity);
    formData.append("sku", data.sku);
    formData.append("bar_code", data.bar_code);

    startTransition(async () => {
      const response = await editVariationAction(formData, variation);
      if (response?.error) {
        toast.error("error while updating the variation");
      }
      toast.success("product varition was updated successfully");
      form.reset();
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="regular_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>regular price</FormLabel>
              <FormControl>
                <Input placeholder="regular price" {...field} type="number" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sale_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>sale price</FormLabel>
              <FormControl>
                <Input placeholder="sale price" {...field} type="number" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input placeholder="Quantity" {...field} type="number" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* sku Field */}
        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product sku</FormLabel>
              <FormControl>
                <Input placeholder="add product sku" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* barcode Field */}
        <FormField
          control={form.control}
          name="bar_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product barcode</FormLabel>
              <FormControl>
                <Input placeholder="add product barcode" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="my-4" disabled={isPending}>
          Edit Variation
        </Button>
      </form>
    </Form>
  );
};

export default EditProductVariation;
