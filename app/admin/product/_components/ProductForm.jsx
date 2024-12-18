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
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { addProductSchema } from "@/lib/validationSchema";
import Link from "next/link";
import { addProductAction } from "../actions/addProductActions";
import { toast } from "sonner";
import { fetchSubcategoriesAction } from "../add-product/fetchSubcategoriesAction";

const ProductForm = ({ categories, sizes }) => {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState([]);

  const [subcategories, setSubcategories] = useState(null);

  const [newSizes, setSizes] = useState([]);

  const form = useForm({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: "",
      slug: "",
      sku: "",
      bar_code: "",
      short_description: "",
      description: "",
      product_img: [],
      categoryId: "",
      quantity: "",
      sale_price: "",
      regular_price: "",
      is_available: false,
      is_featured: false,
      is_newArrival: false,
      is_bestSeller: false,
      sizes: [], // Default empty array for sizes
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    const filteredSlug = data.slug.replace(/\s+/g, "-");
    formData.append("name", data.name);
    formData.append("slug", filteredSlug);
    formData.append("short_description", data.short_description);
    formData.append("description", data.description);
    formData.append("sku", data.sku);
    formData.append("color", data.color);
    formData.append("bar_code", data.bar_code);
    formData.append("categoryId", data.categoryId);
    data.subCategoryId
      ? formData.append("subCategoryId", data.subCategoryId)
      : formData.append("subCategoryId", null);
    formData.append("quantity", data.quantity);
    formData.append("regular_price", data.regular_price);
    formData.append("sale_price", data.sale_price);
    formData.append("is_available", Boolean(data.is_available));
    formData.append("is_bestSeller", Boolean(data.is_bestSeller));
    formData.append("is_featured", Boolean(data.is_featured));
    formData.append("is_newArrival", Boolean(data.is_newArrival));

    if (Array.isArray(data.product_img)) {
      data.product_img.forEach((file) => {
        formData.append("product_img", file);
      });
    }

    formData.append("sizes", JSON.stringify(newSizes));

    // Proceed with the action or API call
    startTransition(async () => {
      const response = await addProductAction(formData);
      if (response?.errors) {
        setErrors(response.errors);
        toast.error("there is an error");
      }
      toast.success("product was added successfully");
    });
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
                  <Input placeholder="add product color" {...field} />
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
                  startTransition(async () => {
                    const subCategories = await fetchSubcategoriesAction(value);
                    setSubcategories(subCategories);
                  });
                }}
                defaultValue={field.value}
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
                <Link
                  href="/admin/category/add-category"
                  className="text-blue-700"
                >
                  category page
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Subcategory Select */}
        {subcategories && (
          <FormField
            control={form.control}
            name="subCategoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subcategory</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Subcategory" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {subcategories?.map((subcategory) => (
                      <SelectItem value={subcategory.id} key={subcategory.id}>
                        {subcategory.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        )}

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

        <div>
          <h2 className="my-10">Product Variation</h2>

          <div>
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>size</FormLabel>
                  <MultiSelector
                    values={newSizes}
                    onValuesChange={setSizes}
                    loop
                    className="max-w-xs"
                  >
                    <MultiSelectorTrigger>
                      <MultiSelectorInput placeholder="Select your size" />
                    </MultiSelectorTrigger>
                    <MultiSelectorContent>
                      <MultiSelectorList>
                        {sizes.map((size) => (
                          <MultiSelectorItem
                            value={size}
                            key={size.id}
                            className="uppercase"
                          >
                            {size.name}
                          </MultiSelectorItem>
                        ))}
                      </MultiSelectorList>
                    </MultiSelectorContent>
                  </MultiSelector>
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

          <div className="grid grid-cols-2 gap-5 mt-10">
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
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Adding...." : "Add Product"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
