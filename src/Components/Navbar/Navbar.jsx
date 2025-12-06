import React, { use, useState } from 'react';
import Logo from './Logo';
import NavLinks from './NavLinks';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';
import { Menu, X } from 'lucide-react';
import { AuthContext } from '../../Contexts/AuthContext';
// import people from '../../assets/people.png'
import { IoCreate } from 'react-icons/io5';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user, setUser, signOutUser, loading } = use(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignout = () => {
    signOutUser()
      .then(() => {
        setUser(null);
        navigate('/auth/login');
      })
      .catch(e => toast.error(e.message));
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="w-11/12 mx-auto py-4 flex justify-between items-center">
        <Link to="/">
          <Logo />
        </Link>

        <div className="hidden md:block">
          <NavLinks />
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-orange-400 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {loading ? (
          <HashLoader color="orange" size={40} />
        ) : user ? (
          <div className="hidden md:flex flex-col items-center space-y-2 ">
            <div className="flex justify-center items-center gap-4">
              <ThemeToggle></ThemeToggle>
              <button
                popoverTarget="popover-1"
                style={{ anchorName: '--anchor-1' }}
                className="relative group"
              >
                <img
                  src={
                    user?.photoURL ||
                    'https://img.icons8.com/?size=160&id=114015&format=png'
                  }
                  className="h-11 w-11 border-2 border-amber-400 rounded-full object-cover cursor-pointer"
                  alt="User"
                />

                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#ff9346] text-white text-sm font-medium py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-md">
                  {user?.displayName}
                </span>
              </button>
            </div>

            <ul
              className="dropdown dropdown-end menu w-52 rounded-box bg-white dark:bg-gray-700 shadow-md space-y-2 text-center"
              popover="auto"
              id="popover-1"
              style={{ positionAnchor: '--anchor-1' }}
            >
              <h2 className="text-lg font-semibold">{user?.displayName}</h2>
              <p className="text-sm ">{user?.email}</p>

              <li>
                {/* <Link
                  to={'/myAddedJobs'}
                  className="hover:bg-amber-50 hover:text-black"
                >
                  <IoCreate color="#ff9346" />
                  My Added Jobs
                </Link> */}
              </li>

              <button
                onClick={handleSignout}
                className="px-5 py-2 bg-[#ff9346] text-white rounded-lg font-semibold hover:bg-[#ff6900] transition cursor-pointer"
              >
                Sign Out
              </button>
            </ul>
          </div>
        ) : (
          <div className="hidden md:flex justify-center items-center gap-4">
            <ThemeToggle></ThemeToggle>
            <Link
              to="/auth/login"
              className="px-5 py-2 border-2 border-[#ff6900] bg-gradient-to-r from-[#ff9346] to-[#ff6900] text-white rounded-lg font-semibold hover:bg-[#ff6900] hover:border-[#ff9346] hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Login
            </Link>

            <Link
              to="/auth/register"
              className="px-5 py-2 border-2 border-[#ff6900] text-[#ff6900] rounded-lg font-semibold hover:bg-[#ff5506] hover:text-white hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-700 border-t border-white dark:border-gray-700 py-4 space-y-4 text-center ">
          <NavLinks />
          {user ? (
            <div className="space-y-3">
              <div>
                <img
                  src={user?.photoURL || people}
                  className="h-12 w-12 rounded-full border-2 border-orange-400 mx-auto"
                  alt="User"
                />
                <p className="font-semibold mt-1">{user?.displayName}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
              <div className="">
                <ThemeToggle></ThemeToggle>
              </div>
              <button
                onClick={handleSignout}
                className="px-6 py-2 bg-[#ff9346] text-white rounded-lg font-semibold hover:bg-[#ff6900] transition"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 items-center">
              <Link
                to="/auth/login"
                className="w-3/4 py-2 bg-[#ff9346] text-white rounded-lg font-semibold hover:bg-[#ff6900] transition"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="w-3/4 py-2 border-2 border-[#ff9346] text-[#ff6900] rounded-lg font-semibold hover:bg-[#ff9346] hover:text-white transition"
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
