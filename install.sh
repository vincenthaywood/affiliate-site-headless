#!/bin/bash

# Headless WordPress Affiliate Site - Installation Script
echo "🚀 Installing Headless WordPress Affiliate Site..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Installation complete!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Copy .env.example to .env.local:"
    echo "   cp .env.example .env.local"
    echo ""
    echo "2. Update your WordPress URL in .env.local"
    echo ""
    echo "3. Run the development server:"
    echo "   npm run dev"
    echo ""
    echo "4. Open http://localhost:3000 in your browser"
    echo ""
    echo "📖 See README.md for WordPress setup instructions"
else
    echo ""
    echo "❌ Installation failed. Please check the error messages above."
    exit 1
fi
