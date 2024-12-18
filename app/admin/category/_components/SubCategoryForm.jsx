"use client";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import React, { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";

import { addSubCategorySchema } from "@/lib/validationSchema";

import { toast } from "sonner";

import { addSubCategoryAction } from "../actions/addSubCategory";

const SubCategoryForm = ({ categoryId }) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(addSubCategorySchema),
    defaultValues: {
      name: "",
      slug: "",
      short_description: "",
      description: "",
      subCategory_img: "",
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    const filteredSlug = data.slug.replace(/\s+/g, "-");
    formData.append("name", data.name);
    formData.append("slug", filteredSlug);
    formData.append("short_description", data.short_description);
    formData.append("description", data.description);
    formData.append("subCategory_img", data.subCategory_img);

    startTransition(async () => {
      await addSubCategoryAction(formData, categoryId);
      toast("subcategory has been added successfully");
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>subcategory name</FormLabel>
                  <FormControl>
                    <Input placeholder="add subcategory name" {...field} />
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
                  <FormLabel>subcategory slug</FormLabel>
                  <FormControl>
                    <Input placeholder="add subcategory slug" {...field} />
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
                  <FormLabel>subcategory short description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="add subcategory short description"
                      {...field}
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>subcategory description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="add subcategory description"
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
          </div>
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Submitting...." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default SubCategoryForm;
// show loading and errors
