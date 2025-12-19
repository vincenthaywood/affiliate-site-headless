import { WPProduct, WPPost, WPCategory } from "./types";

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_WORDPRESS_API_URL is not defined");
}

async function fetchAPI(query: string, variables: Record<string, any> = {}) {
  const res = await fetch(`${API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // ISR - revalidate every 60 seconds
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}

// Get all products with optional category filter
export async function getProducts(categorySlug?: string): Promise<WPProduct[]> {
  const categoryFilter = categorySlug
    ? `, where: { categoryName: "${categorySlug}" }`
    : "";

  const data = await fetchAPI(`
    query GetProducts {
      products(first: 100${categoryFilter}) {
        nodes {
          id
          title
          slug
          excerpt
          date
          modified
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          affiliateFields {
            price
            comparePrice
            affiliateLink
            rating
            reviewCount
            features
            pros
            cons
            buyButtonText
          }
          categories {
            nodes {
              id
              name
              slug
            }
          }
          seo {
            title
            metaDesc
            opengraphImage {
              sourceUrl
            }
          }
        }
      }
    }
  `);

  return data?.products?.nodes || [];
}

// Get a single product by slug
export async function getProductBySlug(slug: string): Promise<WPProduct | null> {
  const data = await fetchAPI(
    `
    query GetProductBySlug($slug: ID!) {
      product(id: $slug, idType: SLUG) {
        id
        title
        slug
        content
        excerpt
        date
        modified
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        affiliateFields {
          price
          comparePrice
          affiliateLink
          rating
          reviewCount
          features
          pros
          cons
          buyButtonText
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
        tags {
          nodes {
            id
            name
            slug
          }
        }
        seo {
          title
          metaDesc
          opengraphImage {
            sourceUrl
          }
        }
      }
    }
  `,
    { slug }
  );

  return data?.product || null;
}

// Get all product slugs for static generation
export async function getAllProductSlugs(): Promise<string[]> {
  const data = await fetchAPI(`
    query GetAllProductSlugs {
      products(first: 1000) {
        nodes {
          slug
        }
      }
    }
  `);

  return data?.products?.nodes?.map((node: { slug: string }) => node.slug) || [];
}

// Get all categories
export async function getCategories(): Promise<WPCategory[]> {
  const data = await fetchAPI(`
    query GetCategories {
      categories(first: 100) {
        nodes {
          id
          name
          slug
          description
          count
        }
      }
    }
  `);

  return data?.categories?.nodes || [];
}

// Get recent blog posts
export async function getRecentPosts(count: number = 6): Promise<WPPost[]> {
  const data = await fetchAPI(
    `
    query GetRecentPosts($count: Int!) {
      posts(first: $count) {
        nodes {
          id
          title
          slug
          excerpt
          date
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              id
              name
              slug
            }
          }
        }
      }
    }
  `,
    { count }
  );

  return data?.posts?.nodes || [];
}

// Search products
export async function searchProducts(searchTerm: string): Promise<WPProduct[]> {
  const data = await fetchAPI(
    `
    query SearchProducts($search: String!) {
      products(first: 50, where: { search: $search }) {
        nodes {
          id
          title
          slug
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          affiliateFields {
            price
            affiliateLink
            rating
          }
        }
      }
    }
  `,
    { search: searchTerm }
  );

  return data?.products?.nodes || [];
}
