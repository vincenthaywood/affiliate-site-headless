import { getProducts } from "@/lib/wordpress";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";

export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 6); // Show first 6 products

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Find Your Perfect Product
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Honest reviews and exclusive deals on the products you love. We
                do the research so you don't have to.
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg" asChild>
                <a href="/products">Browse Products</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/categories">View Categories</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Featured Products
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Check out our hand-picked selection of top-rated products
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" asChild>
              <a href="/products">View All Products</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-12 md:py-24 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Shop by Category
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Browse products in your favorite categories
              </p>
            </div>
            <Button size="lg" asChild>
              <a href="/categories">Explore Categories</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
