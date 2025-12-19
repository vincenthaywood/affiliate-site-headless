# Headless WordPress Affiliate Site

A modern affiliate site built with Next.js 15, TypeScript, TailwindCSS, and Shadcn UI, powered by a headless WordPress backend via GraphQL.

## 🚀 Quick Links

- **[⚡ Quick Start](./QUICKSTART.md)** - Get running in 10 minutes
- **[📖 Detailed Setup Guide](./SETUP.md)** - Step-by-step instructions
- **[🔌 WordPress Plugin](./wordpress-plugin/)** - Auto-setup helper

## ✨ Features

- **Next.js 15** with App Router and Server Components
- **TypeScript** for type safety
- **TailwindCSS** + **Shadcn UI** for beautiful, accessible components
- **WordPress GraphQL** API integration via WPGraphQL
- **Image Optimization** with Next.js Image component
- **ISR (Incremental Static Regeneration)** for optimal performance
- **SEO Optimized** with metadata and OpenGraph support
- **Affiliate-Ready** with built-in affiliate link handling

## 📋 Prerequisites

- Node.js 18+ installed
- A WordPress site (or local WordPress)
- Basic familiarity with npm/git

## 🚀 Quick Installation

```bash
# 1. Clone the repo
git clone https://github.com/vincenthaywood/affiliate-site-headless.git
cd affiliate-site-headless

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with your WordPress URL

# 4. Run development server
npm run dev
```

**👉 See [QUICKSTART.md](./QUICKSTART.md) for complete 10-minute setup**

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Get up and running fast
- **[SETUP.md](./SETUP.md)** - Detailed setup with troubleshooting
- **[wordpress-plugin/README.md](./wordpress-plugin/README.md)** - WordPress plugin guide

## 🏗️ Project Structure

```
├── app/                     # Next.js pages and layouts
│   ├── globals.css          # Global styles with Shadcn theme
│   ├── layout.tsx           # Root layout with header/footer
│   ├── page.tsx             # Home page
│   └── products/[slug]/     # Dynamic product pages
├── components/              # React components
│   ├── ui/                  # Shadcn UI components
│   └── product-card.tsx     # Custom product component
├── lib/                     # Utilities and API
│   ├── types.ts             # TypeScript definitions
│   ├── wordpress.ts         # WordPress GraphQL functions
│   └── utils.ts             # Helper functions
├── wordpress-plugin/        # WordPress setup helper
│   └── headless-affiliate-setup.php
└── [config files]           # Next.js, TypeScript, Tailwind
```

## 🎨 AI IDE Integration

**This project is built for AI-powered development!**

Your AI IDE (Cursor, Windsurf, etc.) can freely modify:
- ✅ All design and styling
- ✅ Component structure
- ✅ Page layouts
- ✅ New features
- ✅ SEO optimization

**Example prompts:**
```
"Change primary color to blue"
"Add a comparison table to product pages"
"Create a categories page"
"Add newsletter signup to footer"
```

WordPress just handles content - you have full control of the frontend!

## 🔧 WordPress Setup (Required)

### Install These Plugins:

1. **WPGraphQL** - [Free](https://wordpress.org/plugins/wp-graphql/)
2. **ACF Pro** - [Purchase](https://www.advancedcustomfields.com/pro/) ($49)
3. **WPGraphQL for ACF** - [Free](https://github.com/wp-graphql/wpgraphql-acf)

### Then Use Our Helper Plugin:

Upload `wordpress-plugin/headless-affiliate-setup.php` to WordPress.

**It automatically:**
- ✅ Creates Products post type
- ✅ Adds all ACF fields
- ✅ Configures GraphQL
- ✅ Sets up admin columns

**👉 See [wordpress-plugin/README.md](./wordpress-plugin/README.md) for details**

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy!

### Other Options

Works with:
- Netlify
- AWS Amplify
- Railway
- Any Node.js host

## 📊 Key Benefits

### For You
✅ Full frontend control  
✅ AI IDE friendly  
✅ Type-safe TypeScript  
✅ Fast hot reload  

### For Content
✅ Familiar WordPress admin  
✅ No rebuilds needed (ISR)  
✅ Media library included  
✅ WYSIWYG editor  

### For Performance
✅ Static generation  
✅ Automatic image optimization  
✅ Edge caching  
✅ Incremental updates  

## 🔧 GraphQL Queries

Main functions in `lib/wordpress.ts`:

- `getProducts()` - All products
- `getProductBySlug()` - Single product
- `getAllProductSlugs()` - For static generation
- `getCategories()` - All categories
- `searchProducts()` - Search functionality

Fully typed with TypeScript!

## 💡 Common Use Cases

### Modify Product Card Design
```typescript
// Edit: components/product-card.tsx
// Your AI IDE can modify styling, layout, or data display
```

### Add New Page
```typescript
// Create: app/your-page/page.tsx
// Follow existing patterns in app/page.tsx
```

### Custom GraphQL Query
```typescript
// Edit: lib/wordpress.ts
// Add new queries following existing examples
```

## 🐛 Troubleshooting

**Products not showing?**
- Check `.env.local` has correct WordPress URL
- Visit `https://your-site.com/graphql` (should work)
- Ensure products are Published in WordPress

**Images not loading?**
- Update `next.config.ts` with your domain
- Or use `hostname: "**"` for development

**Need help?**
- Check [SETUP.md](./SETUP.md) for detailed troubleshooting
- Open a GitHub issue

## 📝 Commands

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Check code quality
```

## 🤝 Contributing

Contributions welcome! Open an issue or submit a PR.

## 📄 License

MIT

## 💬 Support

Questions? Open a GitHub issue or check the documentation.

---

**Built with ❤️ using Next.js, WordPress, and AI**

⭐ Star this repo if you find it helpful!
