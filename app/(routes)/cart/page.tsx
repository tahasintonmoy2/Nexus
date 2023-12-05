"use client";

import Container from "@/components/ui/container";
import NoItemsFound from "@/components/ui/no-items-found";
import { useCart } from "@/hooks/use-cart";
import React, { useState, useEffect } from "react";
import CartItem from "./components/cart-item";
import CartItemMenu from "./components/cart-item-menu";
import ProductSummary from "./components/product-summary";

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
         <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">
            My Cart ({cart.items.length})
          </h1>
            <CartItemMenu />
         </div>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {cart.items.length === 0 && (
                <NoItemsFound title="No items yet? Continue shopping" />
              )}
              <ul>
                {cart.items.map((item) => (
                    <CartItem 
                      key={item.id}
                      data={item}
                    />
                ))}
              </ul>
            </div>
            <ProductSummary />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
