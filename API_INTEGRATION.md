# API Integration

This document maps the frontend code in `src/` to the backend REST endpoints consumed by the app.

## Authentication

- `src/app/(auth)/_actions/authActions.ts`
  - `POST ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`
    - Used by: `src/app/(auth)/login/page.tsx`
    - Payload: `{ email, password }`
  - `POST ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/customers`
    - Used by: `src/app/(auth)/register/page.tsx`
    - Payload: `{ name, email, password, ... }`

## Customer profile

- `src/service/getMyProfile.ts`
  - `GET ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/customers/me`
  - Used by: customer profile pages and shared layout logic.
- `src/app/(public)/(customer)/_actions/profileActions.ts`
  - `PATCH ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/customers/{userId}`
  - Used by: `src/app/(public)/(customer)/profile/page.tsx`
  - Payload: customer update fields

## Technician registration

- `src/app/(public)/_actions/createTechnicianActions.ts`
  - `POST ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/technician/register`
  - Used by: `src/app/(public)/be-a-technician/page.tsx`
  - Payload: technician registration fields

## Services and public marketplace

- `src/service/homeService.ts`
  - `GET ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories`
    - Used by: home page category showcase
  - `GET ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/services?limit={limit}`
    - Used by: home page featured services
  - `GET ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/technician?limit={limit}`
    - Used by: home page top technicians
- `src/app/(public)/services/_actions/service.ts`
  - `GET ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/services?{queryParams}`
    - Used by: `src/app/(public)/services/page.tsx`
  - `GET ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/services/{id}`
    - Used by: `src/app/(public)/services/[id]/page.tsx`

## Customer bookings

- `src/app/(public)/(customer)/_actions/bookingActions.ts`
  - `POST ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/bookings`
    - Used by: booking components for new service bookings
  - `GET ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/bookings/`
    - Used by: `src/app/(public)/(customer)/bookings/page.tsx`
  - `GET ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/bookings/{id}`
    - Used by: `src/app/(public)/(customer)/bookings/[id]/page.tsx`
  - `PATCH ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/bookings/status`
    - Used by: technician booking status updates and customer booking actions
  - `PATCH ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/bookings/status/cancel`
    - Used by: booking cancellation flows

## Payments

- `src/app/(public)/(customer)/_actions/paymentActions.ts`
  - `POST ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/payment/checkout`
  - Used by: customer payment flow when booking status is accepted
- `src/app/(public)/(customer)/_actions/paymentAction.ts`
  - `GET ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/payment/history`
  - Used by: customer payment history listing

## Reviews

- `src/app/(public)/(customer)/_actions/reviewActions.ts`
  - `POST ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reviews`
    - Used by: booking review form submission
  - `GET ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reviews/booking/{bookingId}`
    - Used by: booking review retrieval in booking details

## Admin dashboard

- `src/app/(dashboards)/_actions/manageUserActions.ts`
  - `GET ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/customers`
    - Used by: `src/app/(dashboards)/admin-dashboard/manage-users/page.tsx`
  - `PATCH ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/customers/status`
    - Used by: ban/unban user actions
  - `GET ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/customers/overview`
    - Used by: admin overview components
- `src/app/(dashboards)/_actions/categoriesAction.ts`
  - `GET ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories`
    - Used by: admin category listing page
  - `POST ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories`
    - Used by: admin create category page
  - `PATCH ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories/{id}`
    - Used by: category edit dialogs
  - `DELETE ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories/{id}`
    - Used by: category deletion actions

## Technician dashboard

- `src/app/(dashboards)/technician-dashboard/_actions/profileAction.ts`
  - `PATCH ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/technician/profile`
    - Used by: technician profile page
- `src/app/(dashboards)/technician-dashboard/_actions/serviceAction.ts`
  - `GET ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/services/my-services`
    - Used by: technician service list page
  - `POST ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/services`
    - Used by: create service page
  - `PATCH ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/services/{id}`
    - Used by: service edit actions
  - `DELETE ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/services/{id}`
    - Used by: service deletion actions
- `src/app/(dashboards)/technician-dashboard/_actions/availabilityAction.ts`
  - `GET ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/technician/availability`
    - Used by: availability page
  - `PUT ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/technician/availability`
    - Used by: create/update availability flow

## Notes

- Most authenticated calls include the current JWT token cookie via `getTokenDetails()` and `Cookie: accessToken=${token}`.
- Public listing and home data use unauthenticated GET requests.
- The frontend does not currently define local wrapper routes for these back-end endpoints.
- `API_INTEGRATION.md` sits at the project root as the integration reference.
