"use client";
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
import { Input } from "@/components/ui/input";
import { checkoutSchema } from "@/lib/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import egyptianCities from "./egyptianCities";
import { Button } from "@/components/ui/button";
import { checkoutAction } from "../actions/handleCheckoutAction";

const CheckoutForm = () => {
  const [isPending, startTransition] = useTransition();
  const paymentMethods = [
    { id: 1, value: "cod", name: "Cash on delivery" },
    { id: 2, value: "paymob", name: "Pay with Paymob" },
  ];
  const form = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      apartment: "",
      floor: "",
      building: "",
      postal_code: "",
      street: "",
      phone_number: "",
      city: "",
      payment_method: "",
    },
  });
  const onSubmit = (values) => {
    startTransition(async () => {
      await checkoutAction(values);
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 max-w-4xl">
        <div className="grid grid-cols-2">
          <FormField
            control={form.control}
            name="apartment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>apartment</FormLabel>
                <FormControl>
                  <Input
                    placeholder="add your apartment"
                    type="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="floor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>floor</FormLabel>
                <FormControl>
                  <Input
                    placeholder="add your floor"
                    type="number"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="building"
            render={({ field }) => (
              <FormItem>
                <FormLabel>building</FormLabel>
                <FormControl>
                  <Input
                    placeholder="add your building"
                    type="number"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postal_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>postal code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="add your postal code"
                    type="number"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>street</FormLabel>
              <FormControl>
                <Input placeholder="add your street" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>phone number</FormLabel>
              <FormControl>
                <Input
                  placeholder="add your phone number"
                  type="number"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="payment_method"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem value={method.value} key={method.id}>
                      {method.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>city</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {egyptianCities.map((city) => (
                    <SelectItem value={city.value} key={city.index}>
                      {city.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-10" disabled={isPending}>
          {isPending ? "submitting...." : "Checkout"}
        </Button>
      </form>
    </Form>
  );
};

export default CheckoutForm;
