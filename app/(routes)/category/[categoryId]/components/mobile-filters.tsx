"use client";
import React, { useState } from "react";
import { Color, Size } from "@/type";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";
import { Dialog } from "@headlessui/react";
import IconButton from "@/components/ui/icon-button";
import Filter from "./filter";

interface MobileFiltersProps {
  sizes: Size[];
  colors: Color[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({ sizes, colors }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <Button
        onClick={onOpen}
        variant="outline"
        className="flex items-center rounded-full gap-x-2 lg:hidden"
      >
        Filters
        <SlidersHorizontal size={20} />
      </Button>

      <Dialog
        as="div"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 lg:hidden"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col px-5 overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            <Dialog.Title className="text-xl font-semibold pb-3 flex justify-between">
              Search filters
              <div className="flex items-center justify-end px-4">
                <IconButton
                  icon={<X size={17} className="font-semibold" />}
                  onClick={onClose}
                />
              </div>
            </Dialog.Title>

            <div className="p-4">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>
            <hr className="my-2" />
            <Button onClick={onClose} className="my-2 p-4">
              Apply
            </Button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileFilters;
