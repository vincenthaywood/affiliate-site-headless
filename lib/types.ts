// WordPress GraphQL Types
export interface WPProduct {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails: {
        width: number;
        height: number;
      };
    };
  };
  affiliateFields?: {
    price: string;
    comparePrice?: string;
    affiliateLink: string;
    rating?: number;
    reviewCount?: number;
    features?: string[];
    pros?: string[];
    cons?: string[];
    buyButtonText?: string;
  };
  categories?: {
    nodes: WPCategory[];
  };
  tags?: {
    nodes: WPTag[];
  };
  seo?: {
    title: string;
    metaDesc: string;
    opengraphImage?: {
      sourceUrl: string;
    };
  };
}

export interface WPCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  count?: number;
}

export interface WPTag {
  id: string;
  name: string;
  slug: string;
}

export interface WPPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  author: {
    node: {
      name: string;
      avatar: {
        url: string;
      };
    };
  };
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  categories?: {
    nodes: WPCategory[];
  };
}
