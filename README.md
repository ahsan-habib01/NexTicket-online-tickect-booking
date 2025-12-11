# NexTicket - Client

A modern, full-featured online ticket booking platform for Bus, Train, Launch, and Flight tickets built with React and the MERN stack.

## 🔗 Live Site
[[Your Live URL Here](https://nex-ticket.netlify.app)]

## ✨ Key Features

### For Users
- 🎫 Browse and book tickets for multiple transport types
- 🔍 Search tickets by location and filter by transport type
- 💳 Secure payment with Stripe integration
- 📊 View booking history and transaction records
- ⏱️ Real-time countdown for departure times
- 🌓 Dark/Light mode toggle

### For Vendors
- ➕ Add and manage tickets
- 📝 Update ticket details anytime
- ✅ Accept or reject booking requests
- 📈 Revenue analytics with interactive charts
- 🎯 Track ticket approval status

### For Admins
- 👥 Manage all users and assign roles
- ✔️ Approve or reject vendor tickets
- 📢 Advertise featured tickets on homepage
- 🚫 Mark fraudulent vendors
- 📊 Complete platform oversight

## 🛠️ Tech Stack

- **Frontend:** React 18+ with Vite
- **Routing:** React Router DOM v6
- **Styling:** Tailwind CSS
- **Authentication:** Firebase Authentication
- **State Management:** React Context API / TanStack Query
- **Forms:** React Hook Form 
- **HTTP Client:** Axios
- **Payment:** Stripe React SDK
- **Charts:** Recharts / Chart.js
- **Animations:** Framer Motion
- **Icons:** React Icons / Lucide React
- **Slider:** Swiper.js

## 📦 NPM Packages Used

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.x",
  "firebase": "^10.x",
  "axios": "^1.x",
  "@stripe/react-stripe-js": "^2.x",
  "@stripe/stripe-js": "^2.x",
  "react-hook-form": "^7.x",
  "@tanstack/react-query": "^5.x",
  "recharts": "^2.x",
  "swiper": "^11.x",
  "react-icons": "^5.x",
  "react-hot-toast": "^2.x",
  "date-fns": "^3.x"
}
```


## 🌐 Deployment

This project is configured for deployment on:
- **Netlify** 
- **Vercel**



## 🎨 Design Features

- **Responsive Design:** Fully optimized for mobile, tablet, and desktop
- **Modern UI:** Clean, professional interface with smooth animations
- **Color Consistency:** Unified color theme throughout the application
- **Accessibility:** WCAG compliant with proper contrast ratios
- **Loading States:** Elegant loading spinners for better UX
- **Toast Notifications:** Real-time feedback for user actions
- **Modal Interactions:** Smooth booking and payment flows

## 🔐 Authentication & Authorization

- Firebase Authentication (Email/Password + Google OAuth)
- Protected routes with role-based access control
- Persistent login state across page reloads
- Secure token management
- Automatic redirect to intended routes after login

## 💳 Payment Integration

- Stripe payment gateway integration
- Secure payment processing
- Real-time payment status updates
- Transaction history tracking
- Automatic booking status updates after payment

## 🔍 Search & Filter Features

- Location-based search (From → To)
- Transport type filter (Bus, Train, Launch, Plane)
- Price sorting (Low to High / High to Low)
- Pagination for better performance (6-9 tickets per page)

---
