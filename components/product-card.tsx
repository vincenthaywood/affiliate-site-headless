import Image from "next/image";
import Link from "next/link";
import { Star, ExternalLink } from "lucide-react";
import { WPProduct } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: WPProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const {
    title,
    slug,
    excerpt,
    featuredImage,
    affiliateFields,
    categories,
  } = product;

  const price = affiliateFields?.price ? formatPrice(affiliateFields.price) : null;
  const comparePrice = affiliateFields?.comparePrice
    ? formatPrice(affiliateFields.comparePrice)
    : null;
  const rating = affiliateFields?.rating || null;
  const reviewCount = affiliateFields?.reviewCount || null;

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <Link href={`/products/${slug}`} className="block">
        {featuredImage && (
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={featuredImage.node.sourceUrl}
              alt={featuredImage.node.altText || title}
              fill
              className="object-cover transition-transform hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
      </Link>

      <CardHeader>
        <div className="mb-2 flex items-center gap-2">
          {categories?.nodes && categories.nodes.length > 0 && (
            <span className="text-xs text-muted-foreground">
              {categories.nodes[0].name}
            </span>
          )}
        </div>

        <CardTitle className="line-clamp-2">
          <Link href={`/products/${slug}`} className="hover:text-primary">
            {title}
          </Link>
        </CardTitle>

        {rating && (
          <div className="flex items-center gap-1">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            {reviewCount && (
              <span className="text-sm text-muted-foreground">
                ({reviewCount})
              </span>
            )}
          </div>
        )}

        {excerpt && (
          <CardDescription
            className="line-clamp-3"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
        )}
      </CardHeader>

      <CardFooter className="flex items-center justify-between">
        <div className="flex flex-col">
          {price && (
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{price}</span>
              {comparePrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {comparePrice}
                </span>
              )}
            </div>
          )}
        </div>

        {affiliateFields?.affiliateLink && (
          <Button
            asChild
            size="sm"
            className="group"
          >
            <a
              href={affiliateFields.affiliateLink}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              {affiliateFields.buyButtonText || "View Deal"}
              <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
