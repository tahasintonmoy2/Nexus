import getBillboard from "@/actions/get-billborad";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

export const revalidate = 0;

const Home = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("43061249-7f92-45e4-ab7d-3ac23b1be263");

  return (
    <>
      <Container>
        <div className="space-y-10 pb-10">
          <Billboard data={billboard} />
        </div>
        <div className="flex flex-col gap-y-8 px-4 sm:px-7 lg:px-8 py-3">
          <ProductList title="Featured Products" items={products}/>
        </div>
      </Container>
    </>
  );
};

export default Home;
