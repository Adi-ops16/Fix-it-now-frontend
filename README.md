# Fix-it Now

A home services marketplace built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**. It connects customers with local technicians and includes role-based dashboards for customers, technicians, and admins.

---

## Overview

Fix-it Now is a marketplace where:

- **Customers** browse services, book technicians, pay for accepted bookings, and manage their profile.
- **Technicians** create and manage service listings, view assigned bookings, and update booking status.
- **Admins** oversee the platform, manage categories, and ban/unban users.

The frontend is a REST API consumer and uses server-side utilities for authenticated calls to the backend.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, shadcn/ui primitives |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Auth | JWT in httpOnly cookies |
| Notifications | Sonner |
| Icons | Lucide React |
| Language | TypeScript |

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── _actions/
│   │   ├── _components/
│   │   ├── _schema/
│   │   └── _types/
│   ├── (dashboards)/
│   │   ├── layout.tsx
│   │   ├── admin-dashboard/
│   │   │   ├── all-categories/page.tsx
│   │   │   ├── create-category/page.tsx
│   │   │   ├── manage-users/page.tsx
│   │   │   └── my-profile/page.tsx
│   │   └── technician-dashboard/
│   │       ├── create-availability/page.tsx
│   │       ├── create-service/page.tsx
│   │       ├── my-bookings/page.tsx
│   │       ├── my-profile/page.tsx
│   │       └── my-services/page.tsx
│   ├── (public)/
│   │   ├── page.tsx
│   │   ├── about/page.tsx
│   │   ├── be-a-technician/page.tsx
│   │   ├── services/page.tsx
│   │   ├── services/[id]/page.tsx
│   │   └── (customer)/
│   │       ├── bookings/page.tsx
│   │       ├── bookings/[id]/page.tsx
│   │       ├── payment/cancel/page.tsx
│   │       ├── payment/success/page.tsx
│   │       └── profile/page.tsx
│   ├── api/
│   │   └── customers/status/route.ts
│   ├── layout.tsx
│   ├── globals.css
│   └── proxy.ts
├── components/
│   ├── shared/
│   └── ui/
├── contexts/
├── hooks/
├── lib/
└── service/
```

---

## Available Features

### Public / Marketing

- **Home page** with hero, feature sections, testimonials, categories, and top technicians.
- **About page** with platform details and context.
- **Be a Technician** landing page to start technician registration.
- **Services listing** with category browsing and service search.
- **Service detail page** with booking action for customers.

### Authentication

- Customer registration and login.
- JWT-based authentication stored in an `httpOnly` cookie.
- Protected paths for role-based access.

### Customer Features

- **Bookings list** (`/bookings`) showing all bookings.
- **Booking detail** (`/bookings/[id]`) with booking status, technician details, review section, and payment CTA when accepted.
- **Profile page** (`/profile`) for updating customer data.
- **Payment flow** with success and cancel pages under `/payment/*`.
- **Review system** for completed bookings.

### Technician Features

- **Technician profile** management.
- **Create service** flow for adding new listings.
- **My services** list for editing and deleting technician services.
- **Booking management** (`/technician-dashboard/my-bookings`) for incoming customer bookings.
- **Availability scheduling** page.

### Admin Features

- **Manage users** with active/ban toggle.
- **Create categories** and manage the category list.
- **Admin dashboard profile** page.

### Backend Integration

- Auth and profile data come from an external backend at `NEXT_PUBLIC_BACKEND_API_URL`.
- Uses `getTokenDetails()` to verify JWT and attach auth cookies to backend requests.
- Methods include bookings, payments, reviews, user management, and category management.

---

## Role-Based Access Control

The app uses `src/proxy.ts` to enforce access rules based on the decoded JWT role.

| Role | Allowed area |
|---|---|
| Unauthenticated | Home, services, about, login, register, be-a-technician |
| CUSTOMER | Public pages + customer bookings/profile/payment |
| TECHNICIAN | Public pages + technician dashboard pages |
| ADMIN | Public pages + admin dashboard pages |

---

## Environment Variables

Create a `.env` file with:

```env
NEXT_PUBLIC_BACKEND_API_URL=https://your-backend-url.com
JWT_ACCESS_SECRET=your_jwt_secret
```

---

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

---

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Build app for production |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |

---

## Notes

- The app currently depends on a backend REST API for data and auth.
- Payment is triggered from accepted bookings in the customer booking details.
- Categories, user status toggling, and booking status updates are implemented in dashboard flows.
