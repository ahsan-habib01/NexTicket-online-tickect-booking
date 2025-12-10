import React, { use, useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import { Link, useNavigate, NavLink } from 'react-router';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';
import { Menu, X } from 'lucide-react';
import { AuthContext } from '../../Contexts/AuthContext';
import ThemeToggle from './ThemeToggle';
import { userAPI } from '../../utils/api';

const Navbar = () => {
  const { user, setUser, signOutUser, loading } = use(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch user role
  useEffect(() => {
    if (user?.email) {
      fetchUserRole();
    } else {
      setUserRole(null);
      setRoleLoading(false);
    }
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchUserRole = async () => {
    try {
      setRoleLoading(true);
      const response = await userAPI.getUserByEmail(user.email);
      if (response.success) {
        setUserRole(response.data.role);
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
    } finally {
      setRoleLoading(false);
    }
  };

  const handleSignout = () => {
    signOutUser()
      .then(() => {
        setUser(null);
        setUserRole(null);
        setDropdownOpen(false);
        navigate('/auth/login');
      })
      .catch(e => toast.error(e.message));
  };

  // Get dashboard link based on role
  const getDashboardLink = () => {
    if (roleLoading) return null;

    switch (userRole) {
      case 'admin':
        return '/dashboard/admin/profile';
      case 'vendor':
        return '/dashboard/vendor/profile';
      case 'user':
        return '/dashboard/user/profile';
      default:
        return null;
    }
  };

  const dashboardLink = getDashboardLink();

  return (
    <nav className="bg-base-100 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="w-11/12 mx-auto py-4 flex justify-between items-center">
        {/* Logo - Left Side */}
        <Link to="/">
          <Logo />
        </Link>

        {/* Desktop Menu Items - Center */}
        <div className="hidden md:flex items-center gap-6">
          {/* Home Link */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative font-medium transition-all duration-300 
               ${
                 isActive
                   ? 'text-primary after:w-full after:scale-x-100 after:opacity-100'
                   : 'text-base-content hover:text-primary'
               } 
               after:content-[""] after:absolute after:left-0 after:-bottom-1 
               after:h-[2px] after:bg-gradient-to-r after:from-orange-400 after:via-orange-500 after:to-orange-600 
               after:scale-x-0 after:origin-left after:transition-transform after:duration-300
               hover:after:scale-x-100 hover:after:opacity-100
               hover:scale-105`
            }
          >
            Home
          </NavLink>

          {/* All Tickets - Private Route */}
          {user && (
            <NavLink
              to="/all-tickets"
              className={({ isActive }) =>
                `relative font-medium transition-all duration-300 
                 ${
                   isActive
                     ? 'text-primary after:w-full after:scale-x-100 after:opacity-100'
                     : 'text-base-content hover:text-primary'
                 } 
                 after:content-[""] after:absolute after:left-0 after:-bottom-1 
                 after:h-[2px] after:bg-gradient-to-r after:from-orange-400 after:via-orange-500 after:to-orange-600 
                 after:scale-x-0 after:origin-left after:transition-transform after:duration-300
                 hover:after:scale-x-100 hover:after:opacity-100
                 hover:scale-105`
              }
            >
              All Tickets
            </NavLink>
          )}

          {/* Dashboard - Private Route */}
          {user && dashboardLink && (
            <NavLink
              to={dashboardLink}
              className={({ isActive }) =>
                `relative font-medium transition-all duration-300 
                 ${
                   isActive
                     ? 'text-primary after:w-full after:scale-x-100 after:opacity-100'
                     : 'text-base-content hover:text-primary'
                 } 
                 after:content-[""] after:absolute after:left-0 after:-bottom-1 
                 after:h-[2px] after:bg-gradient-to-r after:from-orange-400 after:via-orange-500 after:to-orange-600 
                 after:scale-x-0 after:origin-left after:transition-transform after:duration-300
                 hover:after:scale-x-100 hover:after:opacity-100
                 hover:scale-105`
              }
            >
              Dashboard
            </NavLink>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-base-200 transition-colors duration-200"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X size={26} className="text-base-content" />
          ) : (
            <Menu size={26} className="text-base-content" />
          )}
        </button>

        {/* Right Side - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />

          {loading ? (
            <HashLoader color="orange" size={40} />
          ) : user ? (
            // Logged In: Username → Avatar → Dropdown
            <div className="flex items-center gap-3" ref={dropdownRef}>
              {/* Username - Left of Avatar */}
              <span className="text-base-content font-medium">
                {user?.displayName}
              </span>

              {/* Clickable Avatar for Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="focus:outline-none focus:ring-2 focus:ring-primary rounded-full"
                >
                  <img
                    src={
                      user?.photoURL ||
                      'https://img.icons8.com/?size=160&id=114015&format=png'
                    }
                    className="h-10 w-10 border-2 border-primary rounded-full object-cover cursor-pointer hover:border-secondary transition-colors duration-200"
                    alt="User Avatar"
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-base-100 rounded-lg shadow-xl border border-base-300 p-2 w-48 transition-colors duration-300 z-50">
                    <ul className="space-y-1">
                      {/* My Profile */}
                      <li>
                        <Link
                          to={dashboardLink}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-base-200 text-base-content transition-colors duration-200"
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
                          <span className="font-medium">My Profile</span>
                        </Link>
                      </li>

                      {/* Divider */}
                      <div className="border-t border-base-300 my-1"></div>

                      {/* Logout */}
                      <li>
                        <button
                          onClick={handleSignout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-error/10 text-error transition-colors duration-200"
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
                          <span className="font-medium">Logout</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Not Logged In: Show Login/Register buttons
            <div className="flex items-center gap-3">
              <Link
                to="/auth/login"
                className="px-5 py-2 border-2 border-primary bg-gradient-to-r from-secondary to-primary text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Login
              </Link>

              <Link
                to="/auth/register"
                className="px-5 py-2 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-base-100 border-t border-base-300 py-4 space-y-3 transition-colors duration-300">
          {/* Mobile Menu Items */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block text-center py-2 transition-colors duration-200 ${
                isActive
                  ? 'text-primary bg-base-200 font-semibold'
                  : 'text-base-content hover:bg-base-200'
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>

          {/* All Tickets - Private */}
          {user && (
            <NavLink
              to="/all-tickets"
              className={({ isActive }) =>
                `block text-center py-2 transition-colors duration-200 ${
                  isActive
                    ? 'text-primary bg-base-200 font-semibold'
                    : 'text-base-content hover:bg-base-200'
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              All Tickets
            </NavLink>
          )}

          {/* Dashboard - Private */}
          {user && dashboardLink && (
            <NavLink
              to={dashboardLink}
              className={({ isActive }) =>
                `block text-center py-2 transition-colors duration-200 ${
                  isActive
                    ? 'text-primary bg-base-200 font-semibold'
                    : 'text-base-content hover:bg-base-200'
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </NavLink>
          )}

          {/* Mobile User Section */}
          {user ? (
            <div className="space-y-3 pt-3 border-t border-base-300">
              <div className="flex flex-col items-center">
                <img
                  src={
                    user?.photoURL ||
                    'https://img.icons8.com/?size=160&id=114015&format=png'
                  }
                  className="h-12 w-12 rounded-full border-2 border-primary"
                  alt="User"
                />
                <p className="font-semibold mt-2 text-base-content">
                  {user?.displayName}
                </p>
                <p className="text-sm text-base-content/70">{user?.email}</p>

                {userRole && (
                  <div className="badge badge-primary badge-sm mt-2">
                    {userRole}
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <ThemeToggle />
              </div>

              <button
                onClick={() => {
                  handleSignout();
                  setMenuOpen(false);
                }}
                className="w-3/4 mx-auto block px-6 py-2 bg-error text-white rounded-lg font-semibold hover:bg-error/90 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            // Mobile Login/Register
            <div className="flex flex-col gap-3 items-center pt-3 border-t border-base-300">
              <ThemeToggle />
              <Link
                to="/auth/login"
                className="w-3/4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-secondary transition-colors duration-200 text-center"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="w-3/4 py-2 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-200 text-center"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
