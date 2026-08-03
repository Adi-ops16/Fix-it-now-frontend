# Fix-it Now

A full-stack home services marketplace built with **Next.js 16** and **React 19**. It connects customers who need household repairs and maintenance with skilled local technicians, offering service browsing, booking management, and role-based dashboards for all three user types.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
  - [Public Pages](#public-pages)
  - [Authentication](#authentication)
  - [Customer Dashboard](#customer-dashboard)
  - [Technician Dashboard](#technician-dashboard)
  - [Admin Dashboard](#admin-dashboard)
- [Role-Based Access Control](#role-based-access-control)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)

---

## Overview

Fix-it Now is a marketplace where:

- **Customers** browse services, book technicians, and track their bookings.
- **Technicians** create and manage service listings, view incoming bookings, and maintain their profile.
- **Admins** oversee the platform and manage user account statuses.

The frontend is a pure REST API consumer — all data persistence is handled by an external backend. The app uses Next.js Server Actions and ISR caching throughout to keep pages fast and up to date.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Styling | Tailwind CSS v4 |
| Component Library | shadcn/ui (via Base UI + class-variance-authority) |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod v4 |
| Auth | JWT (jsonwebtoken) in httpOnly cookies |
| Notifications | Sonner |
| Icons | Lucide React |
| Theme | next-themes (dark / light mode) |
| Language | TypeScript 5 |

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/                     # Login & Register pages + server actions
│   │   ├── login/
│   │   ├── register/
│   │   ├── _actions/               # authActions.ts, userActions.ts
│   │   ├── _components/            # LoginForm, RegisterForm, AuthHeader, etc.
│   │   ├── _schema/                # Zod validation schemas
│   │   └── _types/
│   │
│   ├── (public)/                   # Public-facing pages (no auth required)
│   │   ├── page.tsx                # Home / Landing page
│   │   ├── about/
│   │   ├── be-a-technician/
│   │   ├── services/               # Services listing + [id] detail page
│   │   └── (customer)/             # Protected customer area
│   │       ├── bookings/           # Booking list + detail view
│   │       ├── payment/            # Checkout, success, cancel pages
│   │       └── profile/            # Customer profile management
│   │
│   ├── (dashboards)/
│   │   ├── layout.tsx              # Shared dashboard layout with sidebar
│   │   ├── admin-dashboard/
│   │   │   ├── my-profile/
│   │   │   └── (manage users)/manage-users/
│   │   └── technician-dashboard/
│   │       ├── my-profile/
│   │       ├── my-services/
│   │       ├── create-service/
│   │       └── my-bookings/
│   │
│   └── api/                        # Next.js API routes
│
├── components/
│   ├── shared/                     # Navbar, Logo, ThemeToggleButton, ThemeProvider
│   └── ui/                         # Reusable shadcn/ui primitives
│
├── contexts/
│   └── UserContext.tsx             # Client-side user state (role, id, email)
│
├── hooks/
│   └── useUser.ts                  # Convenience hook for UserContext
│
├── lib/
│   └── types.ts                    # Shared TypeScript interfaces (IUser, ICategory, ITechnician)
│
├── service/
│   ├── getToken.ts                 # JWT decode/verify server utility
│   └── homeService.ts              # SSR data fetching for the landing page
│
└── proxy.ts                        # Middleware — route protection & role-based redirects
```

---

## Features

### Public Pages

- **Home (`/`)** — Hero banner, trust stats, service categories showcase, featured services, how-it-works walkthrough, top technicians, testimonials, and a CTA for technicians to join. Data is fetched in parallel server-side with 10-minute ISR.
- **Services (`/services`)** — Paginated and filterable service listings.
- **Service Detail (`/services/[id]`)** — Full service info with a booking form for logged-in customers.
- **About (`/about`)** — Platform information page.
- **Be a Technician (`/be-a-technician`)** — Registration landing for new technicians.

### Authentication

- **Register (`/register`)** — Creates a new customer account. Input is validated with Zod before the request reaches the backend.
- **Login (`/login`)** — Authenticates the user and stores the JWT in an `httpOnly` cookie (`access_token`).
- **Logout** — Clears the cookie and redirects to the home page.
- Sessions are decoded on the server in `src/service/getToken.ts` using `jsonwebtoken` and the `JWT_ACCESS_SECRET` environment variable.

### Customer Dashboard

Accessible only to users with the `CUSTOMER` role.

| Page | Description |
|---|---|
| `/bookings` | Lists all bookings for the logged-in customer |
| `/bookings/[id]` | Detailed view of a single booking with status info |
| `/payment` | Payment checkout flow |
| `/payment-successful` | Post-payment confirmation |
| `/payment-cancelled` | Cancelled payment handling |
| `/profile` | View and update customer profile |

### Technician Dashboard

Accessible only to users with the `TECHNICIAN` role. Visiting `/technician-dashboard` redirects to `/technician-dashboard/my-profile`.

| Page | Description |
|---|---|
| `my-profile` | Edit technician bio, experience, hourly rate, location, and availability |
| `my-services` | View all services with edit and delete actions |
| `create-service` | Create a new service listing |
| `my-bookings` | View bookings made by customers for the technician's services |

### Admin Dashboard

Accessible only to users with the `ADMIN` role. Visiting `/admin-dashboard` redirects to `/admin-dashboard/my-profile`.

| Page | Description |
|---|---|
| `my-profile` | Admin profile view |
| `manage-users` | Table of all customers with toggle-ban controls (ACTIVE ↔ BAN) |

---

## Role-Based Access Control

Route protection is handled entirely in `src/proxy.ts` (Next.js middleware). The middleware:

1. Reads the `access_token` cookie and decodes the JWT.
2. Extracts the `role` claim (`CUSTOMER`, `TECHNICIAN`, or `ADMIN`).
3. Enforces the following rules:

| Role | Allowed Routes |
|---|---|
| Unauthenticated | `/`, `/about`, `/services/*`, `/login`, `/register` |
| `CUSTOMER` | All public routes + `/bookings`, `/profile`, `/payment/*`, `/be-a-technician` |
| `TECHNICIAN` | All public routes + `/technician-dashboard/*` |
| `ADMIN` | All public routes + `/admin-dashboard/*` |

Any access to a route outside a role's scope results in a rewrite to `/not-found`.

---

## Environment Variables

Create a `.env` file at the project root (use `.env.example` as a template):

```env
NEXT_PUBLIC_BACKEND_API_URL=https://your-backend-url.com/api
JWT_ACCESS_SECRET=your_jwt_secret_here
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_BACKEND_API_URL` | Base URL of the external REST API backend |
| `JWT_ACCESS_SECRET` | Secret used to verify JWT tokens (must match the backend) |

---

## Getting Started

**Prerequisites:** Node.js 18+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Then fill in the values in .env

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint across the project |
