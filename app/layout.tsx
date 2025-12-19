import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Affiliate Site - Best Product Reviews & Deals",
  description: "Find the best products with honest reviews and exclusive deals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center">
            <a href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold text-xl">Affiliate Site</span>
            </a>
            <nav className="flex items-center gap-6 text-sm">
              <a
                href="/products"
                className="transition-colors hover:text-foreground/80"
              >
                Products
              </a>
              <a
                href="/categories"
                className="transition-colors hover:text-foreground/80"
              >
                Categories
              </a>
              <a
                href="/blog"
                className="transition-colors hover:text-foreground/80"
              >
                Blog
              </a>
            </nav>
          </div>
        </header>
        <main className="min-h-screen">{children}</main>
        <footer className="border-t bg-muted/40">
          <div className="container py-8 md:py-12">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="text-lg font-semibold mb-3">About</h3>
                <p className="text-sm text-muted-foreground">
                  We help you find the best products through honest reviews and
                  exclusive deals.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="/about"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="/privacy"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Disclosure</h3>
                <p className="text-sm text-muted-foreground">
                  We earn commissions from qualifying purchases as an affiliate.
                </p>
              </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Affiliate Site. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
