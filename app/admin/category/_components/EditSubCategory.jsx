"use client";
import { editSubCategorySchema } from "@/lib/validationSchema";
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

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { editSubCategoryAction } from "../actions/editSubcategory";
import { toast } from "sonner";

const EditSubCategory = ({ subCategory, categoryId }) => {
  console.log(subCategory);
  const [image, setImage] = useState(null);
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(editSubCategorySchema),
    defaultValues: {
      name: subCategory.name,
      slug: subCategory.slug,
      short_description: subCategory.short_description,
      description: subCategory.description,
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    const filteredSlug = data.slug?.replace(/\s+/g, "-");
    formData.append("name", data.name || subCategory.name);
    formData.append("slug", filteredSlug || subCategory.slug);
    formData.append(
      "short_description",
      data.short_description || subCategory.short_description
    );
    formData.append("description", data.description || subCategory.description);

    if (image) {
      formData.append("subCategory_img", image); // Append new image file
    } else {
      formData.append("subCategory_img", subCategory.imgUrl); // Keep old image if no new image is selected
    }

    // Proceed with the action or API call
    startTransition(async () => {
      await editSubCategoryAction(formData, subCategory);
      toast("subcategory has been edited successfully");
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SubCategory name</FormLabel>
              <FormControl>
                <Input placeholder="add SubCategory name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SubCategory slug</FormLabel>
              <FormControl>
                <Input placeholder="add SubCategory slug" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="short_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SubCategory short description</FormLabel>
              <FormControl>
                <Input
                  placeholder="add SubCategory shortdescription"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SubCategory description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="add SubCategory description"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subCategory_img"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SubCategory Image</FormLabel>

              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0] || null;

                    // Use setValue to update the form state
                    form.setValue("subCategory_img", selectedFile);
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
          {isPending ? "Submitting...." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default EditSubCategory;
