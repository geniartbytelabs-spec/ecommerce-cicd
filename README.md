# FakeStore E-Commerce App

A full-featured e-commerce web application built with React, TypeScript, Redux Toolkit, and React Query.

## Tech Stack

- React + TypeScript
- Redux Toolkit (cart state management)
- React Query (data fetching & caching)
- React Router DOM (page navigation)
- Axios (HTTP requests)
- FakeStoreAPI (mock product data)

## Features

- Product listing with image, title, price, category, description, and rating
- Image fallback for broken URLs (placeholder image)
- Dynamic category filter dropdown (fetched from API)
- Add products to cart from the product listing page
- Shopping cart with item list, quantity, and price
- Remove individual items from cart
- Real-time total items and total price calculation
- Session storage persistence (cart survives page refresh)
- Checkout simulation with success feedback

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository

git clone https://github.com/YOUR_USERNAME/ecommerce-app.git

2. Navigate into the project folder

cd ecommerce-app

3. Install dependencies

npm install

4. Start the development server

npm run dev

5. Open your browser at http://localhost:5173

## Project Structure

src/
├── api/           # API call functions (FakeStoreAPI)
├── components/    # Reusable UI components
├── pages/         # Page components (Home, Cart)
├── store/         # Redux store and cart slice
└── types/         # TypeScript type definitions

## API Reference

This project uses the FakeStoreAPI (https://fakestoreapi.com/)

- GET /products — Fetch all products
- GET /products/categories — Fetch all categories
- GET /products/category/{category} — Fetch products by category