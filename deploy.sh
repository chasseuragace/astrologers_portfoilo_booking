#!/bin/bash

# Netlify deployment script for Flutter web app

echo "🚀 Starting Netlify deployment..."

# Load Netlify credentials from .env file
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
else
    echo "❌ .env file not found"
    echo "Please create a .env file with your Netlify credentials:"
    echo "NETLIFY_AUTH_TOKEN=your_token_here"
    echo "NETLIFY_SITE_ID=your_site_id_here"
    exit 1
fi

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Check if credentials are set
if [ -z "$NETLIFY_AUTH_TOKEN" ]; then
    echo "❌ NETLIFY_AUTH_TOKEN not found in .env file"
    echo "Please add it to your .env file:"
    echo "NETLIFY_AUTH_TOKEN=your_token_here"
    exit 1
fi

if [ -z "$NETLIFY_SITE_ID" ]; then
    echo "❌ NETLIFY_SITE_ID not found in .env file"
    echo "Please add it to your .env file:"
    echo "NETLIFY_SITE_ID=your_site_id_here"
    exit 1
fi

echo "📦 Building Flutter web app..."
flutter build web

if [ $? -ne 0 ]; then
    echo "❌ Flutter build failed"
    exit 1
fi

echo "✅ Flutter build successful"

echo "🌐 Deploying to Netlify..."
netlify deploy --prod --dir=build/web --auth="$NETLIFY_AUTH_TOKEN" --site="$NETLIFY_SITE_ID"

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
else
    echo "❌ Deployment failed"
    exit 1
fi
