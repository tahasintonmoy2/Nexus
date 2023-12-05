"use client";
import React, { useEffect, useState, Fragment } from "react";
import { Popover, Transition, Tab } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { Heart, Search, Trash } from "lucide-react";
import { RiShoppingCartLine } from "react-icons/ri";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useWishlist from "@/hooks/use-wishlist";
import Image from "next/image";
import NoItemsFound from "@/components/ui/no-items-found";
import SearchBar from "./search-bar";
import { useSearch } from "@/hooks/use-search";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useUser();
  const cart = useCart();
  const search = useSearch();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="md:ml-auto lg:ml-auto ml-0 flex items-center ">
      <button
        onClick={search.onOpen}
        className="flex relative md:hidden lg:hidden md:ml-40 lg:ml-40 ml-16 mb-3 mr-2 items-center py-1 pl-9"
      >
        <Search className="h-5 w-5 absolute my-2 left-3" />
      </button>
      <SearchBar onClick={search.onOpen} isSearch />
     <Link href="/cart">
      <div className="flex cursor-pointer">
        <RiShoppingCartLine
          className="h-7 w-7 text-black dark:text-white mr-0.5"
          aria-hidden="true"
        />
        <span className="text-sm mb-4 md:mr-2 ml-0 overflow-hidden font-semibold bg-red-600 text-white px-1 rounded-full">
          {cart.items.length}
        </span>
      </div>
     </Link> 
      <div>
        {!user && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" className="px-2">
                Sign In
              </Button>
            </SignInButton>
          </>
        )}
        {user && (
          <div className="pl-2">
            <UserButton afterSignOutUrl="/" />
          </div>
        )}
      </div>
    </div>
  );
};
