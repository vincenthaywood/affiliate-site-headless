import { notFound } from "next/navigation";
import Image from "next/image";
import { Star, Check, X, ExternalLink } from "lucide-react";
import { getProductBySlug, getAllProductSlugs } from "@/lib/wordpress";
import { formatPrice, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.seo?.title || product.title,
    description: product.seo?.metaDesc || product.excerpt,
    openGraph: {
      title: product.seo?.title || product.title,
      description: product.seo?.metaDesc || product.excerpt,
      images: product.seo?.opengraphImage?.sourceUrl
        ? [product.seo.opengraphImage.sourceUrl]
        : product.featuredImage
        ? [product.featuredImage.node.sourceUrl]
        : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const {
    title,
    content,
    featuredImage,
    affiliateFields,
    categories,
    tags,
    date,
  } = product;

  const price = affiliateFields?.price ? formatPrice(affiliateFields.price) : null;
  const comparePrice = affiliateFields?.comparePrice
    ? formatPrice(affiliateFields.comparePrice)
    : null;
  const rating = affiliateFields?.rating || 0;
  const reviewCount = affiliateFields?.reviewCount || 0;

  return (
    <div className="container py-8 md:py-12">
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <a href="/" className="hover:text-foreground">
          Home
        </a>
        <span>/</span>
        <a href="/products" className="hover:text-foreground">
          Products
        </a>
        {categories?.nodes && categories.nodes.length > 0 && (
          <>
            <span>/</span>
            <a
              href={`/category/${categories.nodes[0].slug}`}
              className="hover:text-foreground"
            >
              {categories.nodes[0].name}
            </a>
          </>
        )}
        <span>/</span>
        <span className="text-foreground">{title}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          {featuredImage && (
            <div className="relative aspect-square overflow-hidden rounded-lg border">
              <Image
                src={featuredImage.node.sourceUrl}
                alt={featuredImage.node.altText || title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {title}
            </h1>

            {/* Rating */}
            {rating > 0 && (
              <div className="mt-4 flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                {reviewCount > 0 && (
                  <span className="text-sm text-muted-foreground">
                    ({reviewCount} reviews)
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Price */}
          {price && (
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold">{price}</span>
                {comparePrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {comparePrice}
                  </span>
                )}
              </div>
              {comparePrice && (
                <p className="text-sm text-green-600 font-medium">
                  Save{" "}
                  {Math.round(
                    ((parseFloat(affiliateFields.comparePrice) -
                      parseFloat(affiliateFields.price)) /
                      parseFloat(affiliateFields.comparePrice)) *
                      100
                  )}
                  %
                </p>
              )}
            </div>
          )}

          {/* CTA Button */}
          {affiliateFields?.affiliateLink && (
            <Button size="lg" className="w-full md:w-auto" asChild>
              <a
                href={affiliateFields.affiliateLink}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="group"
              >
                {affiliateFields.buyButtonText || "Check Current Price"}
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          )}

          {/* Features */}
          {affiliateFields?.features && affiliateFields.features.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {affiliateFields.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Pros & Cons */}
          {(affiliateFields?.pros || affiliateFields?.cons) && (
            <div className="grid gap-4 md:grid-cols-2">
              {affiliateFields.pros && affiliateFields.pros.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600">Pros</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {affiliateFields.pros.map((pro, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {affiliateFields.cons && affiliateFields.cons.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">Cons</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {affiliateFields.cons.map((con, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <X className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Product Content */}
      {content && (
        <div className="mt-12">
          <div
            className="prose prose-slate max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      )}

      {/* Meta Info */}
      <div className="mt-12 flex flex-wrap gap-4 text-sm text-muted-foreground">
        {categories?.nodes && categories.nodes.length > 0 && (
          <div>
            <span className="font-medium">Categories:</span>{" "}
            {categories.nodes.map((cat, index) => (
              <span key={cat.id}>
                <a
                  href={`/category/${cat.slug}`}
                  className="hover:text-foreground"
                >
                  {cat.name}
                </a>
                {index < categories.nodes.length - 1 && ", "}
              </span>
            ))}
          </div>
        )}

        {tags?.nodes && tags.nodes.length > 0 && (
          <div>
            <span className="font-medium">Tags:</span>{" "}
            {tags.nodes.map((tag, index) => (
              <span key={tag.id}>
                {tag.name}
                {index < tags.nodes.length - 1 && ", "}
              </span>
            ))}
          </div>
        )}

        <div>
          <span className="font-medium">Last updated:</span> {formatDate(date)}
        </div>
      </div>
    </div>
  );
}
