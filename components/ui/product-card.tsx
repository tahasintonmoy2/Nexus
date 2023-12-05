"use client";
import { Product } from "@/type";
import Image from "next/image";
import React, { MouseEventHandler } from "react";
import IconButton from "./icon-button";
import { Expand, Heart } from "lucide-react";
import { MdAddShoppingCart } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Currency from "./currency";
import usePreivewModal from "@/hooks/use-preview-modal";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import useWishlist from "@/hooks/use-wishlist";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

interface ProductCardProps {
  data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({
 data 
}) => {
  const previewModal = usePreivewModal();
  const router = useRouter();
  const cart = useCart();
  const wishlist = useWishlist();
  const {user} = useUser();

  const onPreview: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    previewModal.onOpen(data);
  }

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(data);
  };  
  
  const onAddToWishlist: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    wishlist.addItem(data);
  };

  return (
    <>
        <div
          className="bg-white my-4 group cursor-pointer rounded-xl border p-3 space-y-4"
        >
          {/* Img and Action */}
          <div className=" aspect-square rounded-xl border-gray-100 relative">
            <Image
              src={data?.images?.[0]?.url}
              fill
              alt=""
              onClick={() => router.push(`/product/${data?.id}`)}
              className="aspect-square object-cover rounded-md"
            />
            <div className="opacity-0 group-hover:opacity-100 transition w-full absolute px-6 bottom-5">
              <div className="flex gap-x-6 justify-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconButton
                        onClick={onPreview}
                        icon={<Expand size={20} className="text-gray-700" />}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Quick Preivew</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      {user ? (
                        <IconButton
                          onClick={onAddToCart}
                          icon={
                            <MdAddShoppingCart
                              size={20}
                              className="text-gray-700"
                            />
                          }
                        />
                      ): (
                        <Link href="/auth/sign-in">
                        <IconButton
                          onClick={() => {}}
                          icon={
                            <MdAddShoppingCart
                              size={20}
                              className="text-gray-700"
                            />
                          }
                        />
                        </Link>
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to cart</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                     {user ? (
                        <IconButton
                          onClick={onAddToWishlist}
                          icon={<Heart size={20} className="text-gray-700" />}
                        />
                      ): (
                       <Link href='/auth/sign-in'>
                        <IconButton
                          onClick={() => {}}
                          icon={<Heart size={20} className="text-gray-700" />}
                        />
                       </Link>
                     )} 
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to wishlist</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
          {/* Product Name and Category */}
          <div
           onClick={() => router.push(`/product/${data?.id}`)}
          >
            <p className="font-semibold text-lg truncate hover:decoration-blue-600 hover:decoration-2">
              {data.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {data.category?.name}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <Currency value={data?.price} />
          </div>
        </div>
    </>
  );
};

export default ProductCard;
