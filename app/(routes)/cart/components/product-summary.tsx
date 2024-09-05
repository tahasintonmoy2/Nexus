"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { redirect, useSearchParams } from "next/navigation";
import Currency from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";

const ProductSummary = () => {
  const items = useCart((state) => state.items);
  const searchParams = useSearchParams();
  const removedAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed");
      removedAll();
      redirect("/cart");
    }

    if (searchParams.get("canceled")) {
      toast.error("Payment failed, Please try again");
      redirect("/cart");
    }
  }, [searchParams, removedAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: items.map((item) => item.id),
      }
    );

    window.location = response.data.url;
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-200 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-300 pt-4">
          {/* TODO: Add Choosing payment method */}
          <div className="text-base font-medium">Total Payment</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        className="w-full mt-6"
        onClick={onCheckout}
        disabled={items.length === 0}
      >
        Check out with Stripe
      </Button>
    </div>
  );
};

export default ProductSummary;
