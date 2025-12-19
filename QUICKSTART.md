# ⚡ Quick Start - Get Running in 10 Minutes

## Prerequisites
- Node.js 18+ installed
- A WordPress site (or local WordPress)

## Step 1: Clone & Install (2 minutes)

```bash
git clone https://github.com/vincenthaywood/affiliate-site-headless.git
cd affiliate-site-headless
npm install
```

## Step 2: WordPress Setup (5 minutes)

### A. Install WordPress Plugins

1. **WPGraphQL** → Install from WordPress plugin directory
2. **ACF Pro** → [Purchase here](https://www.advancedcustomfields.com/pro/) ($49)
3. **WPGraphQL for ACF** → [Download from GitHub](https://github.com/wp-graphql/wpgraphql-acf)

### B. Install Our Helper Plugin

1. Download: `wordpress-plugin/headless-affiliate-setup.php`
2. Upload to WordPress: **Plugins → Add New → Upload**
3. Activate it

**That's it!** The plugin automatically creates:
- Products post type
- All ACF fields
- GraphQL configuration

## Step 3: Configure Environment (1 minute)

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com
```

## Step 4: Create Test Product (2 minutes)

In WordPress:
1. Go to **Products → Add New**
2. Add:
   - Title: "MacBook Air M3"
   - Description: "Fast, light, powerful"
   - Featured Image: Any product image
   - Price: 999
   - Affiliate Link: Your affiliate URL
   - Rating: 4.5
3. Click **Publish**

## Step 5: Run! (30 seconds)

```bash
npm run dev
```

Open http://localhost:3000 🎉

## What You Should See

✅ Home page with your product  
✅ Product card with image, price, rating  
✅ Clickable product page with full details  
✅ Responsive design  
✅ Fast loading (ISR)  

## Next Steps

### Customize Design
Use your AI IDE (Cursor/Windsurf) to modify:
```
"Change the primary color to blue"
"Add a newsletter signup to the footer"
"Make the product cards larger"
```

### Add More Products
Just create them in WordPress - they appear automatically!

### Deploy to Production
```bash
# Push to GitHub
git push

# Deploy to Vercel (auto-deploys from GitHub)
# or use: vercel --prod
```

## Troubleshooting

### Not seeing products?
- Check WordPress URL in `.env.local`
- Visit `https://your-site.com/graphql` - should work
- Ensure product is Published (not Draft)

### GraphQL endpoint not found?
- Check WPGraphQL plugin is activated
- Check permalink settings (Settings → Permalinks → Save)

### Images not loading?
- Check `next.config.ts` has correct domain
- Or use `hostname: "**"` for dev

## Common Commands

```bash
npm run dev          # Development
npm run build        # Production build
npm run start        # Run production
npm install          # Install dependencies
```

## Need Help?

📖 [Full Setup Guide](./SETUP.md)  
📖 [Complete README](./README.md)  
🐛 [Open an Issue](https://github.com/vincenthaywood/affiliate-site-headless/issues)

---

**Pro Tip**: Your AI IDE can now modify any aspect of the frontend. The entire codebase is in your repo - full control! 🚀
