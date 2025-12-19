# WordPress Setup Plugin

This plugin automatically configures your WordPress site for the headless affiliate site.

## What It Does

✅ Registers "Products" custom post type with GraphQL support  
✅ Creates all required ACF fields automatically  
✅ Adds helpful admin columns (image, price, rating)  
✅ Shows setup instructions in WordPress admin  
✅ Configures GraphQL field names correctly  

## Installation

### Option 1: Via WordPress Admin (Recommended)

1. Download the plugin file: `headless-affiliate-setup.php`
2. In WordPress admin, go to **Plugins → Add New → Upload Plugin**
3. Choose the downloaded file and click **Install Now**
4. Click **Activate Plugin**

### Option 2: Via FTP/File Manager

1. Download `headless-affiliate-setup.php`
2. Upload to `/wp-content/plugins/headless-affiliate-setup/`
3. In WordPress admin, go to **Plugins**
4. Find "Headless Affiliate Site - Setup Helper" and click **Activate**

### Option 3: Direct Install (for local development)

```bash
# Copy the plugin to your WordPress plugins directory
cp headless-affiliate-setup.php /path/to/wordpress/wp-content/plugins/
```

Then activate it in WordPress admin.

## Required Plugins

After activating this plugin, you still need to install:

1. **WPGraphQL** - [Download Free](https://wordpress.org/plugins/wp-graphql/)
   - Provides GraphQL API
   - Can be installed from WordPress plugin directory

2. **Advanced Custom Fields Pro** - [Purchase](https://www.advancedcustomfields.com/pro/)
   - Required for custom fields
   - One-time purchase ($49+)

3. **WPGraphQL for ACF** - [Download Free](https://github.com/wp-graphql/wpgraphql-acf)
   - Exposes ACF fields via GraphQL
   - Download from GitHub

## After Installation

1. **Install required plugins** (see above)
2. **Create your first product**:
   - Go to **Products → Add New**
   - Add title, description, featured image
   - Fill in affiliate fields (price, link, rating, etc.)
   - Publish!

3. **Test GraphQL endpoint**:
   - Visit: `https://your-site.com/graphql`
   - You should see the GraphiQL interface

4. **Configure Next.js**:
   - Update `.env.local` with your WordPress URL
   - Run `npm run dev`
   - Visit http://localhost:3000

## Features Created by Plugin

### Products Post Type
- Custom admin icon
- GraphQL enabled
- Categories and tags support
- Featured image support

### Custom Fields (Auto-Created)
- **price** - Product price (required)
- **comparePrice** - Original price for showing discounts
- **affiliateLink** - Your affiliate URL (required)
- **rating** - Star rating (0-5)
- **reviewCount** - Number of reviews
- **buyButtonText** - Custom button text
- **features** - List of key features
- **pros** - List of pros
- **cons** - List of cons

All fields are automatically exposed via GraphQL!

### Admin Enhancements
- Featured image column in products list
- Price column showing formatted price
- Rating column with stars
- Helpful setup instructions

## Troubleshooting

### Fields Not Showing in GraphQL

Make sure:
1. WPGraphQL plugin is activated
2. WPGraphQL for ACF plugin is activated
3. ACF Pro is activated
4. You've cleared any GraphQL cache

### Products Not Showing

Check that:
1. Products are published (not drafts)
2. GraphQL is working: visit `/graphql`
3. Run this test query:

```graphql
{
  products {
    nodes {
      title
    }
  }
}
```

### Plugin Conflicts

If you experience issues:
1. Deactivate all other plugins
2. Activate them one by one
3. Identify the conflicting plugin

## Uninstallation

To remove:
1. Deactivate plugin in WordPress admin
2. Delete from **Plugins → Installed Plugins**
3. Products and data will remain (safe to uninstall)

## Support

For issues:
- Check the main [SETUP.md](../SETUP.md) guide
- Visit the [GitHub repository](https://github.com/vincenthaywood/affiliate-site-headless)
- Open an issue on GitHub

---

**Note**: This plugin is specifically designed for the headless affiliate site. It won't interfere with other WordPress functionality.
