# 🚀 Quick Setup Guide

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/vincenthaywood/affiliate-site-headless.git
cd affiliate-site-headless
```

### 2. Install Dependencies

**Option A: Using the install script (Recommended)**
```bash
chmod +x install.sh
./install.sh
```

**Option B: Manual installation**
```bash
npm install
```

### 3. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env.local
```

Edit `.env.local` and add your WordPress details:

```env
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Your Affiliate Site Name
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site!

---

## WordPress Setup (Required)

You need to set up WordPress with GraphQL support. Here's how:

### Install Required WordPress Plugins

1. **WPGraphQL** - [Download](https://wordpress.org/plugins/wp-graphql/)
   - Provides GraphQL API for WordPress

2. **Advanced Custom Fields (ACF) Pro** - [Purchase](https://www.advancedcustomfields.com/pro/)
   - Required for custom product fields
   
3. **WPGraphQL for Advanced Custom Fields** - [Download](https://github.com/wp-graphql/wpgraphql-acf)
   - Exposes ACF fields via GraphQL

### Create Products Post Type

Add this to your theme's `functions.php`:

```php
function create_product_post_type() {
    register_post_type('product', array(
        'labels' => array(
            'name' => 'Products',
            'singular_name' => 'Product',
        ),
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'product',
        'graphql_plural_name' => 'products',
        'supports' => array('title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'),
        'taxonomies' => array('category', 'post_tag'),
        'menu_icon' => 'dashicons-products',
    ));
}
add_action('init', 'create_product_post_type');
```

### Create ACF Field Group

In WordPress Admin → Custom Fields → Add New:

**Field Group Name**: Affiliate Fields  
**Location**: Post Type is equal to Product

**Add these fields**:

| Field Label | Field Name | Field Type | Notes |
|------------|------------|------------|-------|
| Price | price | Number | Required |
| Compare Price | comparePrice | Number | Optional (for showing discounts) |
| Affiliate Link | affiliateLink | URL | Required |
| Rating | rating | Number | Min: 0, Max: 5, Step: 0.1 |
| Review Count | reviewCount | Number | |
| Buy Button Text | buyButtonText | Text | Default: "Check Price" |
| Features | features | Repeater | Sub-field: feature (Text) |
| Pros | pros | Repeater | Sub-field: pro (Text) |
| Cons | cons | Repeater | Sub-field: con (Text) |

**Important**: In each field's settings:
- Enable "Show in GraphQL" 
- Set GraphQL Field Name to match the field name exactly

### Install Yoast SEO (Optional but Recommended)

For better SEO metadata:
- Install **Yoast SEO** plugin
- Install **WPGraphQL Yoast SEO** addon

---

## Testing WordPress Connection

### Check GraphQL Endpoint

Visit: `https://your-wordpress-site.com/graphql`

You should see the GraphiQL interface.

### Test Query

Try this query in GraphiQL:

```graphql
query GetProducts {
  products(first: 5) {
    nodes {
      id
      title
      slug
      excerpt
      featuredImage {
        node {
          sourceUrl
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
```

If this works, your setup is correct!

---

## Troubleshooting

### Error: "NEXT_PUBLIC_WORDPRESS_API_URL is not defined"

**Solution**: Make sure you created `.env.local` (not `.env`) and restarted your dev server.

### Error: "Failed to fetch API"

**Possible causes**:
1. WordPress site is not accessible
2. WPGraphQL plugin not installed/activated
3. Wrong URL in `.env.local`

**Check**:
- Visit `https://your-site.com/graphql` in browser
- Verify plugins are activated
- Check URL has no trailing slash

### Products not showing

**Checklist**:
- [ ] Created "Products" post type
- [ ] Post type has `show_in_graphql => true`
- [ ] ACF fields have "Show in GraphQL" enabled
- [ ] At least one product is published
- [ ] Product has a featured image

### Images not loading

**Solution**: 
1. Check `next.config.ts` has your WordPress domain
2. Or use `hostname: "**"` for development (change for production)

---

## Development Workflow

### 1. Content Changes (in WordPress)
- Edit products in WordPress admin
- Changes appear automatically (ISR revalidates every 60 seconds)
- No rebuild needed!

### 2. Design Changes (in Code)
- Modify components in `/components`
- Edit pages in `/app`
- Changes hot-reload instantly
- Your AI IDE can make these changes

### 3. Deploy Changes
- Push to GitHub
- Vercel auto-deploys
- Done!

---

## Next Steps

1. **Add Products**: Create some test products in WordPress
2. **Customize Design**: Use your AI IDE to modify components
3. **Add Features**: Categories page, search, filters, etc.
4. **Deploy**: Push to Vercel for production

## Useful Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Check code quality
npm run setup        # Run installation script
```

---

## Need Help?

- Check the main [README.md](./README.md)
- Open an issue on GitHub
- Review WordPress plugin documentation

---

Built with ❤️ for easy affiliate site management!
