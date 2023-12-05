"use client";
import { Product } from "@/type";
import React, { useState, useEffect, MouseEventHandler } from "react";
import Currency from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();
  const { user } = useUser();

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(data);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold">{data.name}</h2>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-2xl">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-3" />
      <div className="flex flex-col">
        <div className="my-2 flex items-center gap-x-3">
          <h3 className="font-bold">Size:</h3>
          <div className="text-sm font-semibold">{data?.size?.name}</div>
        </div>
        <div className="flex items-center gap-x-3">
          <h3 className="font-bold">Color:</h3>
          <div
            className="h-6 w-6 rounded-full border"
            style={{ backgroundColor: data?.color.value }}
          />
        </div>
      </div>
      <hr className="my-3" />
      <div className="flex mt-5 items-center gap-x-3">
        {user ? (
          <>
            <Button
              onClick={onAddToCart}
              className="flex items-center rounded-full gap-x-2"
              size="sm"
            >
              Add to cart
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </>
        ) : (
          <>
            <Link href="/auth/sign-in">
              <Button
                onClick={() => {}}
                className="flex items-center rounded-full gap-x-2"
                size="sm"
              >
                Add to cart
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Info;
