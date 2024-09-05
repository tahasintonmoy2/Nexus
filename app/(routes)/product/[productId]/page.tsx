import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import Info from "@/components/info";
import ProductList from "@/components/product-list";
import ProductPic from "@/components/product-pic/product-pic";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import NoItemsFound from "@/components/ui/no-items-found";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductIdProps {
  params: {
    productId: string;
  };
}

const ProductId: React.FC<ProductIdProps> = async ({ params }) => {
  const product = await getProduct(params.productId);
  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id,
  });

  return (
    <div className="px-4">
      {product && (
        <Container>
          <div className="px-4 py-10 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8">
              <ProductPic images={product.images} />
              <div className="mt-10 md:px-4 sm:mt-16 sm:px-0 lg:mt-0">
                <Info data={product} />
              </div>
            </div>
          </div>
          <hr className="my-10" />
          <ProductList title="Related items" items={suggestedProducts} />
        </Container>
      )}
      {!product && (
        <>
          <div className="mt-2 lg:grid lg:items-start gap-x-12">
            <div className="lg:col-span-7 flex flex-col items-center justify-center">
              <Image src="/404-error.png" alt="" width={350} height={350} />
              <div className="my-7 text-xl font-bold">
                <NoItemsFound title="404 Error Product Not Found" />
              </div>
              <Link href="/">
                <Button>Go back to home page</Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductId;
