"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category } from "@/type";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface CategoriesMenuProps {
  data: Category[];
  icon: React.ReactElement
}

const CategoriesMenu: React.FC<CategoriesMenuProps> = ({ 
  data,
  icon
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none text-slate-600 focus-visible:ring-transparent">
            {icon}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          alignOffset={11}
          forceMount
        >
          <DropdownMenuLabel>Categories Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {routes.map((route) => (
            <DropdownMenuItem
              key={route.href}
              onClick={() => router.push(route.href)}
            >
              {route.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CategoriesMenu;
