"use client";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import React, { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editCategorySchema } from "@/lib/validationSchema";

import { toast } from "sonner";
import { editCategoryAction } from "../actions/editCategory";

const EditCategoryForm = ({ category }) => {
  const [isPending, startTransition] = useTransition();

  const [image, setImage] = useState(null);

  const form = useForm({
    resolver: zodResolver(editCategorySchema),
    defaultValues: {},
  });
  const onSubmit = (data) => {
    const formData = new FormData();
    const filteredSlug = data.slug?.replace(/\s+/g, "-");
    formData.append("name", data.name || category.name);
    formData.append("slug", filteredSlug || category.slug);
    formData.append(
      "short_description",
      data.short_description || category.short_description
    );
    formData.append("description", data.description || category.description);

    if (image) {
      formData.append("category_img", image); // Append new image file
    } else {
      formData.append("imgUrl", category.imgUrl); // Keep old image if no new image is selected
    }

    // Call your server action
    startTransition(async () => {
      await editCategoryAction(formData, category);
      toast("category was updated successfully");
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field: { value, ...moreFields } }) => (
            <FormItem>
              <FormLabel>Category name</FormLabel>
              <FormControl>
                <Input
                  placeholder="add category name"
                  {...moreFields}
                  value={value || category.name}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field: { value, ...moreFields } }) => (
            <FormItem>
              <FormLabel>Category slug</FormLabel>
              <FormControl>
                <Input
                  placeholder="add category slug"
                  {...moreFields}
                  value={value || category.slug}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="short_description"
          render={({ field: { value, ...moreFields } }) => (
            <FormItem>
              <FormLabel>short description</FormLabel>
              <FormControl>
                <Input
                  placeholder="add category slug"
                  {...moreFields}
                  value={value || category.short_description}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field: { value, ...moreFields } }) => (
            <FormItem>
              <FormLabel>Category description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="add category description"
                  {...moreFields}
                  value={value || category.description}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Image
          src={category.imgUrl}
          height={200}
          width={200}
          alt="category image"
        />
        <FormField
          control={form.control}
          name="category_img"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Image</FormLabel>

              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0] || null;

                    // Use setValue to update the form state
                    form.setValue("category_img", selectedFile);
                    setImage(selectedFile);
                  }}
                  ref={field.ref} // Ensure the input is properly registered
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update"}
        </Button>
      </form>
    </Form>
  );
};

export default EditCategoryForm;
// show loading and errors
