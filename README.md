# FakeStore E-Commerce App

A React e-commerce application with full CI/CD pipeline using GitHub Actions and Vercel.

## Live Demo

[https://ecommerce-cicd.vercel.app](https://ecommerce-cicd.vercel.app)

## Tech Stack

- React 19 + TypeScript
- Redux Toolkit (state management)
- React Router DOM
- Vite (build tool)
- Vitest + React Testing Library (testing)
- GitHub Actions (CI/CD)
- Vercel (deployment)

## Features

- Browse products from FakeStore API
- Add/remove items from cart
- Cart persists on page refresh (sessionStorage)
- Checkout simulation

## CI/CD Pipeline

Automated pipeline triggered on every push to main:

1. **Build** — compiles the project
2. **Test** — runs 7 unit and integration tests
3. **Deploy** — deploys to Vercel only if all tests pass

## Running Locally

```bash
npm install
npm run dev
```

## Running Tests

```bash
npm test
```

## Tests Included

- `Navbar.test.tsx` — renders brand name, displays cart count
- `ProductCard.test.tsx` — renders product info, dispatches addToCart
- `Cart.test.tsx` — integration test: adding product updates cart, checkout clears cart