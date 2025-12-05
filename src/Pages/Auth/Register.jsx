import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import useAuth from '../../Hooks/useAuth';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const { setUser, createUser, profileUpdate, googleSignIn, setLoading } =
    useAuth();

  const validatePassword = password => {
    if (password.length < 6) return 'Must be at least 6 characters';
    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password))
      return 'Must include both uppercase and lowercase letters';
    return '';
  };

  const handlePasswordChange = e => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleRegister = e => {
    e.preventDefault();
    const displayName = e.target.name?.value;
    const photoURL = e.target.photo?.value;
    const email = e.target.email?.value;

    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
      return;
    }

    createUser(email, password)
      .then(res => {
        const user = res.user;
        profileUpdate(displayName, photoURL)
          .then(() => {
            setUser(user);
            e.target.reset();
            setPassword('');
            toast.success('Registration successful!');
            setLoading(false);
            navigate('/');
          })
          .catch(err => {
            toast.error(err.message);
            setLoading(false);
          });
      })
      .catch(err => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then(res => {
        const user = res.user;
        setUser(user);
        setLoading(false);
        navigate('/');
      })
      .catch(err => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  return (
    <section
      className="flex items-center justify-center min-h-screen  bg-gradient-to-r from-[#fff3ea] to-[#fffdfb] 
  dark:from-[#0f172a] dark:to-[#020617] py-16"
    >
      <title>Create Your Account - Freelify</title>
      <div className="w-11/12 max-w-md bg-white dark:bg-[#161b22] shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-[#ff6f3c] text-center mb-2">
          Create Your Account
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          A Global Hub for Freelancers and Dream Projects
        </p>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6900] dark:focus:ring-[#ff5500]"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
              Photo URL
            </label>
            <input
              type="url"
              name="photo"
              placeholder="Enter your photo URL"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6900] dark:focus:ring-[#ff5500]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6900] dark:focus:ring-[#ff5500]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                required
                className={`w-full px-4 py-2 border ${
                  passwordError
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-600 focus:ring-[#ff6900] dark:focus:ring-[#ff5500]'
                } rounded-lg focus:outline-none focus:ring-2 pr-10 transition-all duration-300`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-[#ff6f3c] text-white font-semibold py-2 rounded-lg hover:bg-[#ff9346] dark:hover:bg-[#ff6900] transition cursor-pointer"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center my-1">
          <div className="w-1/4 h-px bg-gray-300 dark:bg-gray-600"></div>
          <span className="mx-3 text-gray-500 dark:text-gray-400 font-medium">
            or
          </span>
          <div className="w-1/4 h-px bg-gray-300 dark:bg-gray-600"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-center text-gray-700 dark:text-gray-300 mt-6">
          Already have an account?{' '}
          <Link
            to="/auth/login"
            className="text-[#ff6f3c] font-semibold hover:text-[#ff9346]"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
