"use client"
import { Product } from '@/type'
import React from 'react'
import NoResults from "@/components/ui/no-results";
import ProductCard from '@/components/ui/product-card';

interface ProductListProps {
    title: string;
    items: Product[];
}

const ProductList:React.FC<ProductListProps> = ({
    title,
    items
}) => {
  return (
    <div className='space-y-4'>
        <h2 className='font-bold text-3xl'>
            {title}
        </h2>
        {items.length === 0 && <NoResults />}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          {items.map((item) => (
              <ProductCard key={item.id} data={item}/>
          ))}
        </div>
    </div>
  )
}

export default ProductList