import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/hooks/use-cart";
import { Heart, MoreVertical, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import React from "react";

const CartItemMenu = () => {
  const router = useRouter();
  const initialData = useCart();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none text-slate-600 focus-visible:ring-transparent">
          <MoreVertical className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" alignOffset={11} forceMount>
          <DropdownMenuItem
            onClick={() => router.push("/wishlist")}
            className="text-muted-foreground"
          >
            <Heart className="h-4 w-4 mr-2" />
            View wishlist
          </DropdownMenuItem>
          {initialData.items.length > 1 && (
            <DropdownMenuItem
              onClick={() => initialData.removeAll()}
              className="text-muted-foreground"
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete All Items
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CartItemMenu;
