import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layouts/MainLayout';
import VendorDashboardLayout from '../Layouts/VendorDashboardLayout';
import UserDashboardLayout from '../Layouts/UserDashboardLayout';
import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';
import Home from '../Pages/Home/Home/Home';
import AllTickets from '../Pages/AllTickets/AllTickets';
import TicketDetails from '../Pages/TicketDetails/TicketDetails';
import PrivateRoute from './PrivateRoute';

// Vendor Pages
import AddTicket from '../Pages/Dashboard/Vendor/AddTicket';
import VendorProfile from '../Pages/Dashboard/Vendor/VendorProfile';
import MyAddedTickets from '../Pages/Dashboard/Vendor/MyAddedTickets';
import RequestedBookings from '../Pages/Dashboard/Vendor/RequestedBookings';
import RevenueOverview from '../Pages/Dashboard/Vendor/RevenueOverview';

// User Pages
import UserProfile from '../Pages/Dashboard/User/UserProfile';
import MyBookedTickets from '../Pages/Dashboard/User/MyBookedTickets';
import TransactionHistory from '../Pages/Dashboard/User/TransactionHistory';

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'auth/login',
        Component: Login,
      },
      {
        path: 'auth/register',
        Component: Register,
      },
      {
        path: 'all-tickets',
        element: (
          <PrivateRoute>
            <AllTickets />
          </PrivateRoute>
        ),
      },
      {
        path: 'ticket/:id',
        element: (
          <PrivateRoute>
            <TicketDetails />
          </PrivateRoute>
        ),
      },
    ],
  },

  // Vendor Dashboard
  {
    path: '/dashboard/vendor',
    element: (
      <PrivateRoute>
        <VendorDashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: 'profile',
        Component: VendorProfile,
      },
      {
        path: 'add-ticket',
        Component: AddTicket,
      },
      {
        path: 'my-tickets',
        Component: MyAddedTickets,
      },
      {
        path: 'bookings',
        Component: RequestedBookings,
      },
      {
        path: 'revenue',
        Component: RevenueOverview,
      },
    ],
  },

  // User Dashboard
  {
    path: '/dashboard/user',
    element: (
      <PrivateRoute>
        <UserDashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: 'profile',
        Component: UserProfile,
      },
      {
        path: 'bookings',
        Component: MyBookedTickets,
      },
      {
        path: 'transactions',
        Component: TransactionHistory,
      },
    ],
  },
]);

export default router;

