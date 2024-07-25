# The Oasis (Hotel Booking Site for Customers)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Welcome to The Oasis! This is a hotel booking site designed to provide a seamless and user-friendly experience for customers looking to book a stay at our luxurious accommodations.

## Demo Link

You can explore this by clicking on [The Oasis for Customers](https://oasis-customer.vercel.app/).

## Technology Features

- Modern Web Framework: Built using **Next.js with the App Router, React Server Components, and Server Actions.**
- Styling: Styled using **Tailwind** CSS
- Database Integration: Uses **Supabase** for backend-as-a-service.
- Dynamic Routing: Supports dynamic route segments and nested layouts.
- Error Handling: Implements error boundaries with **error.js** for robust error handling.
- Manual **Cache Revalidation**: Custom cache revalidation using revalidatePath.
- User Authentication: Secure authentication with **NextAuth** with OAuth for Google.
- Route Protection: Utilizes **Next.js middleware** to protect routes by reading incoming cookies and headers.
- **React-day-picker** for the calendar to book a room

## User-Facing Features

- Profile Management: Edit your profile details with ease.
- Booking Management: Create, update, and cancel your bookings effortlessly.
- Cabin Filtering: Filter available cabins based on maximum guest capacity.
- Reservation History: View your past and upcoming reservations.
- Interactive Calendar: Book a room using an intuitive calendar interface.
- Optimized Experience: Enjoy optimized fonts and images for a smooth browsing experience.

## Getting Started

First, Create Environment Variables

- Create a `.env.local` file in the root directory of your project and add the following parameters:

  - SUPABASE_URL=https://yours.supabase.co
  - SUPABASE_KEY={Your variables}
  - NEXTAUTH_URL={Your development URL ex: http://localhost:3000/}
  - NEXTAUTH_SECRET={Your variables}
  - AUTH_GOOGLE_ID={Your variables}
  - AUTH_GOOGLE_SECRET={Your variables}

Second, Install dependencies:

```bash
npm install

```

Third, run the development server:

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The project is set up for **continuous integration and deployment** with GitHub and Vercel. To deploy the application, follow these steps:

1. Push your changes to the GitHub repository.
2. Vercel will automatically build and deploy the latest version of the application.

## Contact

Feel free to reach out to me for any questions or feedback:

- Email: [joshua80.ko@gmail.com](mailto:joshua80.ko@gmail.com)
