"use client";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import React, { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addCategorySchema } from "@/lib/validationSchema";
import { toast } from "sonner";
import { addCategoryAction } from "../actions/addCategory";

const CategoryForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      name: "",
      slug: "",
      short_description: "",
      description: "",
      category_img: "",
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    const filteredSlug = data.slug.replace(/\s+/g, "-");
    formData.append("name", data.name);
    formData.append("slug", filteredSlug);
    formData.append("description", data.description);
    formData.append("short_description", data.short_description);
    formData.append("category_img", data.category_img);

    startTransition(async () => {
      await addCategoryAction(formData);
      toast("category has been added successfully");
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
              <FormLabel>Category name</FormLabel>
              <FormControl>
                <Input placeholder="add category name" {...field} />
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
              <FormLabel>Category slug</FormLabel>
              <FormControl>
                <Input placeholder="add category slug" {...field} />
              </FormControl>
              <FormDescription>
                that is what will appear in the url
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="short_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>short description</FormLabel>
              <FormControl>
                <Input placeholder="add short_description" {...field} />
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
              <FormLabel>Category description</FormLabel>
              <FormControl>
                <Textarea placeholder="add category description" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
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
        <Button type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default CategoryForm;
