import Image from "next/image";
import { toast } from "sonner";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/type";
import React from "react";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import Link from "next/link";

interface CartItemProps {
  data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  return (
    <div>
      <li className="flex py-6 border-b">
        <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
          <Image
            src={data?.images?.[0].url}
            alt=""
            fill
            className="rounded-md object-cover object-center"
          />
        </div>
        <div className="relative ml-4 flex-col flex sm:ml-6">
          <div className="absolute md:right-0 right-8 top-0">
            <button
              onClick={() => cart.removeItem(data.id)}
              className="absolute hover:bg-slate-200 rounded-md p-2"
            >
              <Trash className="h-5 w-5 text-red-600" />
            </button>
          </div>
          <div className=" pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
            <div>
              <Link href={`/product/${data.id}`} target="_blank">
                <div className="flex justify-between">
                  <p className=" md:text-lg cursor-pointer hover:underline hover:decoration-blue-600 hover:decoration-2 text-ellipsis inline-grid overflow-hidden text-xs font-semibold">
                    {data.name}
                  </p>
                </div>
              </Link>

              <div className="flex items-center">
                <p className="text-sm text-muted-foreground">
                  {data.category.name} -
                </p>
                <p className="text-sm text-muted-foreground pl-1">
                  {data.color.name} -
                </p>
                <p className="text-sm text-muted-foreground pl-1">
                  {data.size.name}
                </p>
              </div>
              <Currency value={data.price} />
            </div>
          </div>
        </div>
      </li>
    </div>
  );
};

export default CartItem;
