import React from "react";
import Container from "@/components/ui/container";
import Link from "next/link";
import { MainNav } from "@/components/main-nav";
import getCategories from "@/actions/get-categories";
import { NavbarActions } from "@/components/navbar-actions";
import { Separator } from "@/components/ui/separator";
import CategoriesMenu from "./categories-menu";
import { Menu } from "lucide-react";

export const revalidate = 0;

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div>
      <Container>
        <div className="relative ml-0 pr-2 lg:px-8 flex h-16 items-center">
          <div className="md:hidden block">
            <CategoriesMenu
              data={categories}
              icon={<Menu className="h-7 w-7" />}
            />
          </div>
          <Link href="/" className="ml-2 flex lg:ml-0">
            <p className="font-bold text-2xl">Nexus</p>
          </Link>
          <MainNav data={categories} />
          <NavbarActions />
        </div>
      </Container>
      <Separator />
    </div>
  );
};

export default Navbar;
