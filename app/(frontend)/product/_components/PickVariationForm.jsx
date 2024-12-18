"use client";

import { pickVariationSchema } from "@/lib/validationSchema";
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
import AddToCartButton from "../../_components/AddToCartButton";
import { incrementCartQuantity } from "../../actions/cartAction";
import { toast } from "sonner";
import { getProductVariation } from "../[id]/actions/getProductVariationAction";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const PickVariationForm = ({ product, sizes }) => {
  const [variation, setVariation] = useState(null);

  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(pickVariationSchema),
    defaultValues: {
      sizeId: "",
    },
  });

  const handleSubmit = (data) => {
    const formData = new FormData();

    formData.append("sizeId", data.sizeId);

    startTransition(async () => {
      const response = await incrementCartQuantity(formData, product.id);
      if (response?.error) {
        toast.error(response?.error);
      }
      toast.success(response?.message);
    });
  };

  const handleSizeSelection = async (sizeId) => {
    const variation = await getProductVariation(sizeId, product.id);
    setVariation(variation);
  };
  const productSizes = product.variations.map((size) => size.size);

  function isSizeAvailable(productSizes, id) {
    return productSizes.some((size) => size.id === id);
  }

  return (
    <div className="mt-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="my-5">
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
                  >
                    <div className="grid grid-cols-3 lg:grid-cols-5 size">
                      {sizes.map((size) => {
                        const isDisabled = !isSizeAvailable(
                          productSizes,
                          size.id
                        );
                        return (
                          <FormItem
                            key={size.id}
                            className={`${isDisabled ? "hidden" : "abled"}`}
                          >
                            <FormControl>
                              <RadioGroupItem
                                value={size.id}
                                disabled={isDisabled}
                              />
                            </FormControl>
                            <FormLabel
                              className={`font-normal !m-0 !p-0 w-full h-10 cursor-pointer flex justify-center items-center border border-blue-500/20  ${
                                isDisabled ? "disabled" : "abled"
                              }`}
                              onClick={() => handleSizeSelection(size.id)}
                            >
                              {size.name}
                            </FormLabel>
                          </FormItem>
                        );
                      })}
                    </div>
                  </RadioGroup>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <AddToCartButton
            isPending={isPending}
            quantity={variation?.quantity}
          />
        </form>
      </Form>
      {variation && (
        <div className="flex gap-2 my-4">
          Quantity
          {variation?.quantity > 3 ? (
            <p className="font-bold">INSTOCK</p>
          ) : (
            <p className="text-red-500 uppercase">{variation?.quantity} left</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PickVariationForm;
