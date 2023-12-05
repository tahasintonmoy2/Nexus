import React from "react";
import { Tab } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { Image as ImageType } from "@/type";
import Image from "next/image";

interface ProductPicTabProps {
  image: ImageType;
}

const ProductPicTab: React.FC<ProductPicTabProps> = ({
 image
}) => {
  return (
    <Tab
      className="relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white"
    >
        {({ selected }) => (
            <div>
                <span className="absolute w-full h-full aspect-square inset-0 overflow-hidden rounded-md">
                    <Image 
                        src={image.url}
                        alt=""
                        fill
                        className="object-cover object-center"
                    />
                </span>
                <span className={cn(
                  'absolute inset-0 rounded-lg ring-offset-2 ring-2',
                  selected
                    ? 'ring-blue-700 shadow'
                    : 'ring-transparent'
                )}/>
            </div>
        )}
    </Tab>
  );
};

export default ProductPicTab;
