"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { editProductSchema } from "@/lib/validationSchema";
import Link from "next/link";
import Image from "next/image";
import { XIcon } from "lucide-react";
import { deleteProductImage } from "../actions/deleteProductImage";
import { editProductAction } from "../actions/editProductActions";
import { toast } from "sonner";

import { fetchSubcategoriesAction } from "../add-product/fetchSubcategoriesAction";

const EditProductForm = ({ categories, product, subcategories }) => {
  const [newSubcategories, setSubcategories] = useState(subcategories);

  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      name: product.name || "",
      slug: product.slug || "",
      color: product.color || "",
      short_description: product.short_description || "",
      description: product.description || "",
      product_img: [], // Images need special handling
      categoryId: product.categoryId || "",
      subCategoryId: product.subCategoryId || "",
      is_available: product.is_available || false,
      is_featured: product.is_featured || false,
      is_newArrival: product.is_newArrival || false,
      is_bestSeller: product.is_bestSeller || false,
    },
  });
  const { reset, setValue } = form;
  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    const filteredSlug = data.slug?.replace(/\s+/g, "-");
    formData.append("name", data.name);
    formData.append("slug", filteredSlug);
    formData.append("color", data.color);
    formData.append("short_description", data.short_description);
    formData.append("description", data.description);
    formData.append("categoryId", data.categoryId);
    formData.append("subCategoryId", data.subCategoryId);
    formData.append("is_available", Boolean(data.is_available));
    formData.append("is_bestSeller", Boolean(data.is_bestSeller));
    formData.append("is_featured", Boolean(data.is_featured));
    formData.append("is_newArrival", Boolean(data.is_newArrival));

    if (Array.isArray(data.product_img)) {
      data.product_img.forEach((file) => {
        formData.append("product_img", file);
      });
    }

    startTransition(async () => {
      await editProductAction(formData, product.id);
      toast("product has been edited successfully");
    });
  };
  const handleDelete = (image) => {
    startTransition(async () => {
      await deleteProductImage(image);
    });
  };
  const handleCategoryChange = async (value) => {
    setValue("categoryId", value);
    const fetchedSubcategories = await fetchSubcategoriesAction(value);
    setSubcategories(fetchedSubcategories);
    reset({ ...form.getValues(), subCategoryId: "" });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product name</FormLabel>
                <FormControl>
                  <Input placeholder="add product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* slug Field */}
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product slug</FormLabel>
                <FormControl>
                  <Input placeholder="add product slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
          <FormField
            control={form.control}
            name="short_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product short description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="add product short description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product color</FormLabel>
                <FormControl>
                  <Input
                    placeholder="add product short description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product description</FormLabel>
              <FormControl>
                <Textarea placeholder="add product description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Upload */}
        <div>
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((image) => (
              <div className="relative  my-5" key={image.id}>
                <Image src={image.url} width={"400"} height={200} alt="" />
                <AlertDialog>
                  <AlertDialogTrigger>
                    <XIcon className="absolute top-2 right-2 cursor-pointer bg-white rounded-full text-red-500" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your image and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(image)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
          </div>
          <FormField
            control={form.control}
            name="product_img"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    multiple
                    onChange={(e) => {
                      const selectedFiles = Array.from(e.target.files) || [];
                      field.onChange(selectedFiles);
                    }}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Category Select */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  handleCategoryChange(value);
                }}
                defaultValue={product.categoryId}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem value={category.id} key={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage categories in the{" "}
                <Link href="/admin/category/add-category">category page</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Sub Category Select */}
        <FormField
          control={form.control}
          name="subCategoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subcategory" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {newSubcategories?.map((subCategory) => (
                    <SelectItem value={subCategory.id} key={subCategory.id}>
                      {subCategory.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Checkbox Fields */}
        <div className="grid grid-cols-2 gap-10">
          <FormField
            control={form.control}
            name="is_available"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>available</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_featured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Featured</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-10">
          <FormField
            control={form.control}
            name="is_bestSeller"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>best seller</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_newArrival"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>new arrival</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">
          {isPending ? "Updating....." : "Update Product"}
        </Button>
      </form>
    </Form>
  );
};

export default EditProductForm;
