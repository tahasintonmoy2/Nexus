"use client";

import Container from "@/components/ui/container";
import NoItemsFound from "@/components/ui/no-items-found";
import React, { useState, useEffect } from "react";
import CartItem from "./components/cart-item";
import CartItemMenu from "./components/cart-item-menu";
import useWishlist from "@/hooks/use-wishlist";

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const wishlist = useWishlist();

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
              My Wishlist ({wishlist.items.length})
            </h1>
            <CartItemMenu />
          </div>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              {wishlist.items.length === 0 && (
                <NoItemsFound title="No items yet? Continue shopping" />
              )}
              <ul>
                {wishlist.items.map((item) => (
                  <CartItem 
                   key={item.id} 
                   data={item} 
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
