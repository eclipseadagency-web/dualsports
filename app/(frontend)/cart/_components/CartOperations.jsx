"use client";
import React, { useState, useTransition } from "react";
import { removeCartItem, setCartItemQuantity } from "../../actions/cartAction";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Trash, Trash2, Trash2Icon } from "lucide-react";

const CartOperations = ({
  quantity,
  productVariationId,
  cartItemId,
  stockLeft,
}) => {
  const [isPending, startTransition] = useTransition();
  const [stockError, setStockError] = useState(false);
  const quantityOptions = [];
  for (let i = 1; i <= 10; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  return (
    <div>
      <div className="flex gap-4">
        <div className="my-1 flex items-center gap-2">
          Quantity:
          <select
            className="border border-slate-300 p-1 rounded-lg select w-full max-w-[40px]"
            defaultValue={quantity}
            onChange={(e) => {
              setStockError(false);
              const newQuantity = parseInt(e.currentTarget.value);

              if (newQuantity > stockLeft - 1) {
                setStockError(true);
                toast.error(`there are only ${stockLeft} left`);
                return;
              }

              startTransition(async () => {
                await setCartItemQuantity(productVariationId, newQuantity);
                toast.success("product was updated successfully");
              });
            }}
          >
            {quantityOptions}
          </select>
        </div>
        <div>
          <Button
            variant="outline"
            size="sm"
            disabled={isPending}
            onClick={() => {
              startTransition(async () => {
                await removeCartItem(cartItemId);
                toast.success("item has been removed successfully");
              });
            }}
          >
            <Trash size={15} />
            Remove
          </Button>
        </div>
      </div>
      {stockError && (
        <p className="bg-red-400/30 mt-4 p-2 text-red-700 rounded-lg">
          there are only {stockLeft} left
        </p>
      )}
    </div>
  );
};

export default CartOperations;
