import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layouts/MainLayout';
import VendorDashboardLayout from '../Layouts/VendorDashboardLayout';
import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';
import Home from '../Pages/Home/Home/Home';
import AllTickets from '../Pages/AllTickets/AllTickets';
import PrivateRoute from './PrivateRoute';

// Vendor Pages
import AddTicket from '../Pages/Dashboard/Vendor/AddTicket';
import VendorProfile from '../Pages/Dashboard/Vendor/VendorProfile';
import MyAddedTickets from '../Pages/Dashboard/Vendor/MyAddedTickets';

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
    ],
  },
]);

export default router;
