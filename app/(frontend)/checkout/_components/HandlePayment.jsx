"use client";

import { Button } from "@/components/ui/button";

import React from "react";
import {
  createOrder,
  generatePaymentKey,
  handlePaymentAction,
} from "../actions/handlePaymentAction";

const HandlePayment = () => {
  const handleClick = async () => {
    const token = await handlePaymentAction();
    const OrderId = await createOrder(token, 100);
    const results = await generatePaymentKey(token, OrderId, 100);
    window.location.href = `https://accept.paymob.com/api/acceptance/iframes/862533?payment_token=${results}`;
  };
  return (
    <div>
      <Button onClick={handleClick}>HandlePayment</Button>
    </div>
  );
};

export default HandlePayment;
