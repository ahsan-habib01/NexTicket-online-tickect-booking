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
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-orange-50 to-orange-100 dark:from-base-300 dark:to-base-200 py-16 transition-colors duration-300">
      <title>Create Your Account - NexTicket</title>
      <div className="w-11/12 max-w-md bg-base-100 shadow-2xl rounded-2xl p-8 border border-base-300">
        <h2 className="text-3xl font-bold text-primary text-center mb-2">
          Create Your Account
        </h2>
        <p className="text-center text-base-content/70 mb-6">
          Join NexTicket and start your journey today
        </p>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-base-content font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="input input-bordered w-full focus:input-primary bg-base-200"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-base-content font-medium mb-2">
              Photo URL
            </label>
            <input
              type="url"
              name="photo"
              placeholder="Enter your photo URL"
              className="input input-bordered w-full focus:input-primary bg-base-200"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-base-content font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="input input-bordered w-full focus:input-primary bg-base-200"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-base-content font-medium mb-2">
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
                className={`input input-bordered w-full pr-10 bg-base-200 ${
                  passwordError ? 'input-error' : 'focus:input-primary'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {passwordError && (
              <p className="text-error text-sm mt-1 flex items-center gap-1">
                <span>⚠️</span>
                {passwordError}
              </p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="btn btn-primary w-full font-semibold"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="divider text-base-content/50">or</div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full gap-3"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-center text-base-content/80 mt-6">
          Already have an account?{' '}
          <Link
            to="/auth/login"
            className="text-primary font-semibold hover:text-secondary transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
