# Headless WordPress Affiliate Site

A modern affiliate site built with Next.js 15, TypeScript, TailwindCSS, and Shadcn UI, powered by a headless WordPress backend via GraphQL.

## 🚀 Features

- **Next.js 15** with App Router and Server Components
- **TypeScript** for type safety
- **TailwindCSS** + **Shadcn UI** for beautiful, accessible components
- **WordPress GraphQL** API integration via WPGraphQL
- **Image Optimization** with Next.js Image component
- **ISR (Incremental Static Regeneration)** for optimal performance
- **SEO Optimized** with metadata and OpenGraph support
- **Affiliate-Ready** with built-in affiliate link handling

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- A WordPress site with the following plugins:
  - WPGraphQL
  - WPGraphQL for ACF (Advanced Custom Fields)
  - ACF Pro (for custom product fields)

## 🛠️ Setup

### 1. Clone the Repository

```bash
git clone https://github.com/vincenthaywood/affiliate-site-headless.git
cd affiliate-site-headless
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Update the following variables in `.env.local`:

```env
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Your Affiliate Site
```

### 4. WordPress Configuration

#### Install Required Plugins

1. **WPGraphQL** - Exposes WordPress data via GraphQL
2. **WPGraphQL for ACF** - Adds ACF fields to GraphQL
3. **ACF Pro** - For custom product fields

#### Create ACF Field Group

Create an ACF field group called "Affiliate Fields" with the following fields:

- **price** (Number)
- **comparePrice** (Number) - Optional
- **affiliateLink** (URL)
- **rating** (Number, 0-5)
- **reviewCount** (Number)
- **features** (Repeater → Text)
- **pros** (Repeater → Text)
- **cons** (Repeater → Text)
- **buyButtonText** (Text) - e.g., "Check Price", "View Deal"

Apply this field group to your "Products" post type.

#### Create Products Post Type

```php
// Add to your theme's functions.php or custom plugin
function create_product_post_type() {
    register_post_type('product', array(
        'labels' => array(
            'name' => 'Products',
            'singular_name' => 'Product',
        ),
        'public' => true,
        'has_archive' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'product',
        'graphql_plural_name' => 'products',
        'supports' => array('title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'),
        'taxonomies' => array('category', 'post_tag'),
    ));
}
add_action('init', 'create_product_post_type');
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
├── app/
│   ├── globals.css          # Global styles with Shadcn theme
│   ├── layout.tsx           # Root layout with header/footer
│   ├── page.tsx             # Home page
│   └── products/
│       └── [slug]/
│           └── page.tsx     # Dynamic product pages
├── components/
│   ├── ui/                  # Shadcn UI components
│   │   ├── button.tsx
│   │   └── card.tsx
│   └── product-card.tsx     # Custom product card component
├── lib/
│   ├── types.ts             # TypeScript types
│   ├── wordpress.ts         # WordPress GraphQL API functions
│   └── utils.ts             # Utility functions
├── .env.example             # Environment variables template
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
└── tsconfig.json            # TypeScript configuration
```

## 🎨 Customization with AI IDE

This project is designed to work seamlessly with AI IDEs like Cursor or Windsurf. The entire codebase is in your repository, making it easy for AI to:

1. **Modify Design** - Change colors, layouts, and components
2. **Add Features** - Create new page types, components, or functionality
3. **Optimize SEO** - Update metadata and structured data
4. **Customize Content** - Modify product display logic

### Example AI Prompts:

```
"Add a comparison table component to product pages"
"Change the color scheme to use blue as primary color"
"Add a newsletter signup section to the footer"
"Create a category page that lists all products in a category"
"Add breadcrumbs to all pages"
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

This is a standard Next.js app and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- Any Node.js hosting platform

## 📊 WordPress Setup Options

### Hosting WordPress

- **Shared Hosting** - Cheapest option (Bluehost, SiteGround)
- **WP Engine** - Premium managed WordPress hosting
- **DigitalOcean** - VPS with more control
- **Local** - For development (LocalWP, XAMPP)

## 🔧 GraphQL Queries

The app uses the following main queries:

- `getProducts()` - Fetch all products
- `getProductBySlug()` - Fetch single product
- `getAllProductSlugs()` - Generate static paths
- `getCategories()` - Fetch all categories
- `searchProducts()` - Search functionality

All queries are in `lib/wordpress.ts` and can be modified for your needs.

## 🎯 Key Benefits

### For Development
- **Full Control** - All frontend code in your repo
- **AI-Friendly** - Clear structure for AI IDE modifications
- **Type Safe** - TypeScript throughout
- **Fast Iteration** - Hot reload with Next.js

### For Content
- **Easy Management** - Familiar WordPress admin
- **No Rebuilds** - ISR keeps content fresh
- **Media Library** - WordPress handles all images
- **WYSIWYG** - Classic WordPress editor

### For Performance
- **Static Generation** - Lightning-fast pages
- **Image Optimization** - Automatic with Next.js
- **Edge Caching** - Via Vercel Edge Network
- **Incremental Updates** - Only rebuild what changed

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a PR.

## 💬 Support

For issues or questions, please open a GitHub issue.

---

Built with ❤️ using Next.js, WordPress, and AI
