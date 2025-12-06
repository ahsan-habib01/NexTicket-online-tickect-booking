import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';

const UserDashboardLayout = () => {
  const { user, signOutUser } = useAuth();
  const { role, loading } = useUserRole(user?.email);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await signOutUser();
    navigate('/auth/login');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Check if user is regular user
  if (role !== 'user') {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-4">This page is for users only.</p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="drawer lg:drawer-open">
      <input
        id="user-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isSidebarOpen}
        onChange={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-200 lg:hidden">
          <div className="flex-none">
            <label htmlFor="user-drawer" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1">
            <span className="text-xl font-bold">User Dashboard</span>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="user-drawer" className="drawer-overlay"></label>
        <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar Header */}
          <div className="mb-8">
            <Link to="/" className="text-2xl font-bold text-primary">
              NexTicket
            </Link>
            <p className="text-sm text-gray-500 mt-1">User Dashboard</p>
          </div>

          {/* User Profile */}
          <div className="mb-6 p-4 bg-base-100 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img
                    src={user?.photoURL || 'https://via.placeholder.com/100'}
                    alt="Profile"
                  />
                </div>
              </div>
              <div>
                <p className="font-semibold">{user?.displayName}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
                <span className="badge badge-primary badge-sm mt-1">User</span>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard/user/profile"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary hover:text-white transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Profile
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/user/bookings"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary hover:text-white transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
                My Bookings
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/user/transactions"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary hover:text-white transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Transactions
              </Link>
            </li>
          </ul>

          <div className="divider"></div>

          {/* Bottom Actions */}
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-300 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Back to Home
              </Link>
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-error hover:text-white transition w-full text-left"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
