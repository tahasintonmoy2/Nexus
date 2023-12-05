"use client";
import { cn } from "@/lib/utils";
import { Category } from "@/type";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import CategoriesMenu from "@/components/categories-menu";

interface MainNavProps {
  data: Category[];
}

export const MainNav: React.FC<MainNavProps> = ({ 
  data 
}) => {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  return (
    <nav className="mx-3 flex overflow-hidden items-center justify-between space-x-4 lg:space-x-6">
      <div className="md:block hidden overflow-hidden space-x-4 lg:space-x-4">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-black",
              route.active ? "text-black" : "text-neutral-500"
            )}
          >
            {route.label}
          </Link>
        ))}
      </div>
      {routes.length > 6 && (
        <div className="items-center cursor-pointer md:block lg:block hidden rounded-full px-1 py-1">
          <CategoriesMenu
            data={data}
            icon={
              <MoreVertical className="h-5 w-5 text-sm md:block lg:block hidden" />
            }
          />
        </div>
      )}
    </nav>
  );
};
