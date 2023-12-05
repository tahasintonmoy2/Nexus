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

export const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const cart = useCart();
  const wishlist = useWishlist();
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
        className="flex relative md:hidden lg:hidden md:ml-40 lg:ml-40 ml-36 mb-3 mr-2 items-center py-1 pl-9"
      >
        <Search className="h-5 w-5 absolute my-2 left-3" />
      </button>
      <SearchBar onClick={search.onOpen} isSearch />
      <Popover className="relative dark:bg-transparent dark:border-none border-none">
        {({ open }) => (
          <>
            <Popover.Button
              className={cn(
                "focus:outline-none",
                `${open ? "text-white" : "text-white/90"}`
              )}
            >
              <div className="flex">
                <RiShoppingCartLine
                  className="h-7 w-7 text-black dark:text-white mr-0.5"
                  aria-hidden="true"
                />
                <span className="text-sm mb-4 md:mr-2 ml-0 overflow-hidden font-semibold bg-red-600 text-white px-1 rounded-full">
                  {cart.items.length}
                </span>
              </div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-2 w-[520px] max-w-sm md:-translate-x-[33rem] lg:-translate-x-[33rem] -translate-x-[23.15rem] transform px-4 sm:px-0 lg:max-w-2xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                  <div className="relative bg-white p-7">
                    <div className="ml-4 ">
                      <Tab.Group>
                        <Tab.List className="flex space-x-1 rounded-xl w-full">
                          <Tab
                            key={"category"}
                            className={({ selected }) =>
                              cn(
                                "w-full rounded-lg py-2.5 flex items-center justify-center text-sm font-medium leading-5 ring-offset-transparent focus:outline-none focus:ring-transparent",
                                selected
                                  ? "text-white bg-blue-600 shadow-sm"
                                  : "text-slate-400 hover:bg-white/[0.12] hover:text-blue-400"
                              )
                            }
                          >
                            <RiShoppingCartLine className="h-5 w-5 md:mr-2" />
                            My Cart ({cart.items.length})
                          </Tab>
                          <Tab
                            key={"category"}
                            className={({ selected }) =>
                              cn(
                                "w-full rounded-lg py-2.5 flex items-center justify-center text-sm font-medium leading-5 ring-offset-transparent focus:outline-none focus:ring-transparent",
                                selected
                                  ? "text-white bg-blue-600 shadow-sm"
                                  : "text-slate-400 hover:bg-white/[0.12] hover:text-blue-400"
                              )
                            }
                          >
                            <Heart className="h-5 w-5 mr-2" />
                            My Wishlist ({wishlist.items.length})
                          </Tab>
                        </Tab.List>
                        <Tab.Panels className="mt-2">
                          <Tab.Panel
                            key={"idx"}
                            className={cn(
                              "rounded-xl bg-white p-3 ring-offset-transparent focus:outline-none focus:ring-transparent",
                              ""
                            )}
                          >
                            <div className="mb-2 text-blue-600 hover:text-blue-400 font-semibold text-sm flex items-center justify-end">
                              <button onClick={() => router.push("/cart")}>
                                Go to cart
                              </button>
                            </div>
                            {cart.items.length === 0 && (
                              <NoItemsFound title="No items yet? Continue shopping" />
                            )}
                            {cart.items.map((item) => (
                              <div className="my-4">
                                <div className="flex items-center justify-between">
                                  <div
                                    className="flex items-center cursor-pointer justify-start"
                                    onClick={() =>
                                      router.push(`/product/${item.id}`)
                                    }
                                  >
                                    <Image
                                      src={item?.images?.[0].url}
                                      alt=""
                                      width={50}
                                      height={50}
                                      className="rounded-md"
                                    />
                                    <div>
                                      <p className="ml-2 hover:underline hover:decoration-blue-600 hover:decoration-2 text-ellipsis inline-grid overflow-hidden text-xs font-semibold">
                                        {item.name}
                                      </p>
                                      <p className="text-sm text-muted-foreground px-2">
                                        {item.category.name}
                                      </p>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => cart.removeItem(item.id)}
                                    className="hover:bg-slate-200 rounded-md p-2"
                                  >
                                    <Trash className="h-5 w-5 text-red-600" />
                                  </button>
                                </div>
                              </div>
                            ))}

                            <div className="mt-6 flex items-center justify-center">
                              {cart.items.length > 5 && (
                                <Button onClick={() => router.push("/cart")}>
                                  View in cart
                                </Button>
                              )}
                            </div>
                          </Tab.Panel>
                          <Tab.Panel
                            key={"idx"}
                            className={cn(
                              "rounded-xl bg-white p-3",
                              "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                            )}
                          >
                            {wishlist.items.length === 0 && (
                              <NoItemsFound title="No items yet? Continue shopping" />
                            )}
                            {wishlist.items.map((item) => (
                              <div className="my-4">
                                <div className="flex items-center justify-between">
                                  <div
                                    className="flex items-center cursor-pointer justify-start"
                                    onClick={() =>
                                      router.push(`/product/${item.id}`)
                                    }
                                  >
                                    <Image
                                      src={item?.images?.[0].url}
                                      alt=""
                                      width={50}
                                      height={50}
                                      className="rounded-md"
                                    />
                                    <div>
                                      <p className="ml-2 hover:underline hover:decoration-blue-600 hover:decoration-2 text-ellipsis inline-grid overflow-hidden text-xs font-semibold">
                                        {item.name}
                                      </p>
                                      <p className="text-sm text-muted-foreground px-2">
                                        {item.category.name}
                                      </p>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => wishlist.removeItem(item.id)}
                                    className="hover:bg-slate-200 rounded-md p-2"
                                  >
                                    <Trash className="h-5 w-5 text-red-600" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </Tab.Panel>
                        </Tab.Panels>
                      </Tab.Group>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
      <div>
        {!user && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" className="px-2">Sign In</Button>
            </SignInButton>
          </>
        )}
        {user && (
          <div className="pl-2">
            <UserButton afterSignOutUrl="/"/>
          </div>
        )}
      </div>
    </div>
  );
};
