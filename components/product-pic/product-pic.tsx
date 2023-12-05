"use client"
import { Tab } from '@headlessui/react'
import { Image as ImageType } from "@/type";
import ProductPicTab from './product-pic-tab';
import Image from 'next/image';

interface ProductPicProps {
    images: ImageType[];
}

const ProductPic:React.FC<ProductPicProps> = ({
    images = []
}) => {

  return (
      <Tab.Group as='div' className='flex flex-col-reverse'>
        {/* Tabbar */}
          <div className="w-full max-w-2xl mx-auto mt-6 lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6">
          {images.map((image)=> (
            <ProductPicTab key={image.id} image={image}/>
          ))}
        </Tab.List>
         </div>
         {/* Tabbar Preivew */}
        <Tab.Panels className="aspect-square w-full">
           {images.map((image)=> (
                <Tab.Panel
                    key={image.id}
                >
                    <div className='aspect-square relative h-full w-full sm:rounded-lg overflow-hidden'>
                        <Image 
                           src={image.url}
                           alt=''
                           fill
                           className='object-cover object-center rounded-md'
                        /> 
                    </div>
                </Tab.Panel>
           ))} 
        </Tab.Panels>
      </Tab.Group>
  )
}

export default ProductPic