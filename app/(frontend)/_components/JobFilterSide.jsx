"use client";

import { Label } from "@/components/ui/label";

import React, { useState, useTransition } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import "@/app/globals.css";
import { filterAction } from "../actions/filterAction";
import { filterSchema } from "@/lib/validationSchema";
import { useRouter } from "next/navigation";
const JobFilterSide = ({ sizes, categoryId, productColors, subCategoryId }) => {
  const [range, setRange] = useState([0, 300]);
  const [ssize, setSize] = useState();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleRangeChange = (value) => {
    setRange(value);
  };
  const form = useForm({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      sizeId: "",
      color: "",
    },
  });
  const onSubmit = (values) => {
    const formData = new FormData();

    formData.append("sizeId", values.sizeId);
    formData.append("color", values.color);
    formData.append("priceRange", range);
    startTransition(async () => {
      await filterAction(formData, categoryId, subCategoryId);
    });
  };
  const onClearFilters = () => {
    form.reset(); // Reset the form fields
    setRange([0, 300]); // Reset the price range slider
    router.push(`/category/${categoryId}`);
    router.refresh();
  };

  function getProductSizeId(newSizesArray, value) {
    const isExist = newSizesArray.find(
      (newSize) => newSize.name.toLowerCase() == value.toLowerCase()
    );
    if (!isExist) {
      return null;
    }
    return isExist.id;
  }
  const handleSizeSelection = (sizeId) => {
    setSize(sizeId);
  };
  return (
    <aside className="relative md:sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[300px]  md:block">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Size Select */}
            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem className="py-2">
                  <FormLabel>Select Size</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className=""
                    >
                      <div className="grid grid-cols-3 lg:grid-cols-5 size">
                        {sizes.map((size) => (
                          <FormItem className={``} key={size.id}>
                            <FormControl>
                              <RadioGroupItem
                                value={getProductSizeId(sizes, size.name)}
                              />
                            </FormControl>
                            <FormLabel
                              className={`font-normal !m-0 !p-0 w-full h-10 cursor-pointer flex justify-center items-center border border-blue-500/20  ${
                                ssize == size.id ? "abled" : ""
                              }`}
                              onClick={() => handleSizeSelection(size.id)}
                            >
                              {size.name}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </div>
                    </RadioGroup>
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
                  <FormLabel>Color</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {productColors.map((productColor) => (
                        <SelectItem
                          value={productColor.color}
                          key={productColor.id}
                        >
                          {productColor.color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Label className="my-3">Price</Label>
              <div className="my- test">
                <Slider
                  defaultValue={[0, 300]}
                  max={1000}
                  min={0}
                  step={50}
                  value={range}
                  onValueChange={handleRangeChange}
                  formatLabel={(value) => `${value} SAR`}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-14">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Searching..." : "Search"}
            </Button>
            <Button type="button" variant="outline" onClick={onClearFilters}>
              Clear Filters
            </Button>
          </div>
        </form>
      </Form>
    </aside>
  );
};

export default JobFilterSide;
