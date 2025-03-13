# Disney Fireworks Photography Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/392bc4a0-d035-4166-af67-0d7789116987/deploy-status)](https://app.netlify.com/sites/jesse-photo-website/deploys)

A modern photography showcase featuring Disney fireworks displays with integrated location data. This project demonstrates how to build a feature-rich, geo-aware photo gallery using Astro and modern web technologies.

## 📷 Project Overview

This website displays a collection of Disney fireworks photographs with an interactive twist - each photo is connected to its exact shooting location. Visitors can:

- Browse photos in a responsive masonry grid
- View images in a modal with expanded details
- See exact shooting locations on an interactive map
- Toggle between gallery and map views

## 🛠️ How It's Built

### Core Framework: Astro

The site is built with [Astro](https://astro.build/) (v5.5.2), a modern static site generator that provides:

- Excellent performance with minimal JavaScript shipped to the client
- Island architecture for interactive components
- Built-in image optimization
- Content collections for structured data

Astro's content collections feature is used to organize and query the photo library from Cloudinary, handling both images and videos within the same gallery.

### Image Management: Cloudinary

Instead of hosting images directly, this project leverages [Cloudinary](https://cloudinary.com/) for:

- On-demand image transformations
- Automatic responsive images
- EXIF data extraction from photographs
- Video hosting and processing
- CDN delivery for global performance

The Cloudinary setup is configured in `cloudinary-setup.ts`, which authenticates with the API using environment variables.

### Geolocation Features

One of the standout aspects of this project is the location awareness. This is achieved through:

- **EXIF Extraction**: Using `ExifReader` to pull GPS coordinates from photo metadata
- **Coordinate Parsing**: `CoordinateParser` converts raw GPS data into usable latitude/longitude
- **Location Display**: Google Maps integration to visualize shooting locations
- **Centralized Mapping**: `Geolib` calculates the center point of all photo locations

The GPS coordinates are extracted during the build process and stored with each image, allowing both the gallery and map to reference the same location data.

### UI Components and Styling

The user interface is built with:

- **Tailwind CSS** (v4.0): Utility-first CSS framework for responsive design
- **DaisyUI**: Component library adding pre-designed elements on top of Tailwind
- **Astro Masonry**: Creates the responsive, Pinterest-style image grid
- **Svelte**: Used for interactive components that require client-side functionality

### Performance Optimizations

Several techniques are employed to ensure fast page loads:

- Images are lazy-loaded and served at appropriate sizes via Cloudinary
- JavaScript is minimized using Astro's partial hydration
- Metadata processing happens at build time, not runtime
- The map is only loaded when the user requests it

### SEO and Metadata

The site implements several SEO best practices:

- Structured data (JSON-LD) for images and gallery information
- OpenGraph images generated dynamically
- Proper alt text for all images including location data
- Sitemap and robots.txt generation

## 🔧 Technical Architecture

### Content Pipeline

The photo loading process works as follows:

1. `content.config.ts` defines a content collection that fetches images from Cloudinary
2. During build, each image's metadata is extracted, including GPS coordinates
3. GPS data is parsed into both human-readable and machine-readable formats
4. The processed collection is used to generate both the image gallery and map markers

### Interactive Components

The site includes several interactive elements:

- **Image Modal**: Shows enlarged photos with location data (`ImageModal.astro`)
- **Google Maps Integration**: Displays photo locations with clustering (`GoogleMaps.astro`)
- **Layout Adjustment**: Dynamically adjusts layouts based on image orientation

### Development Tooling

The development experience is enhanced with:

- **TypeScript**: For type safety and better developer experience
- **Biome**: Modern JavaScript/TypeScript linter and formatter
- **Bun**: Fast JavaScript runtime and package manager for development

## 📊 Build Process

The build process compiles the Astro site using Bun for improved performance:

```zsh
bunx --bun astro build
```

This generates a static site with dynamic features that can be deployed to any static hosting provider.

## 🌟 Key Features Implemented

- **EXIF Data Extraction**: Pulls metadata directly from photographs
- **Coordinate Conversion**: Transforms GPS data into multiple formats for different use cases
- **Responsive Image Grid**: Adapts to any screen size
- **Image Modal**: Shows details with contextual information
- **Map Integration**: Clusters markers for areas with multiple photos
- **Dynamic Layout Adjustment**: Changes layout based on image orientation
- **SEO Optimization**: Includes structured data for better search indexing

---

Built by Jesse Slomowitz using Astro, Cloudinary, and Google Maps

### This README was assisted by Claude in writing it up
