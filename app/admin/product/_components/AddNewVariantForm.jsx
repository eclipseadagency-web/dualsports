"use client";

import { AddNewVariationSchema } from "@/lib/validationSchema";
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
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addProductVariation } from "../actions/addProductVariation";
import { toast } from "sonner";

const AddNewVariantForm = ({ sizes, product }) => {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState();

  const form = useForm({
    resolver: zodResolver(AddNewVariationSchema),
    defaultValues: {
      quantity: "",
      regular_price: "",
      sale_price: "",
      sku: "",
      bar_code: "",
      sizeId: "",
    },
  });

  const onSubmit = async (data) => {
    // Debugging: Log the submitted data

    const formData = new FormData();
    formData.append("quantity", data.quantity);
    formData.append("sale_price", data.sale_price);
    formData.append("regular_price", data.regular_price);
    formData.append("sku", data.sku);
    formData.append("bar_code", data.bar_code);

    formData.append("sizeId", data.sizeId);

    startTransition(async () => {
      const response = await addProductVariation(formData, product.id);
      if (response?.error) {
        setErrors(response?.error);
        toast.error(response?.error);
      }
      toast.success("new variation has been added");
      form.reset();
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-10">
          <div>
            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem value={size.id} key={size.id}>
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can manage size in the{" "}
                    <Link href="/admin/variations" className="text-blue-700">
                      manage variations page
                    </Link>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="regular_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variation regular price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="add regular price"
                      {...field}
                      type="number"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="sale_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variation sale price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="add sale price"
                      {...field}
                      type="number"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter quantity" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Adding..." : "Add Variation"}
        </Button>
      </form>
    </Form>
  );
};

export default AddNewVariantForm;
