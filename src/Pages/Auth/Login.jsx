import React, { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import useAuth from '../../Hooks/useAuth';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const emailRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const { setUser, signIn, googleSignIn, setLoading } = useAuth();

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

  const handleLogin = e => {
    e.preventDefault();
    const email = e.target.email?.value;
    const error = validatePassword(password);

    if (error) {
      setPasswordError(error);
      return;
    }
    setPasswordError('');

    signIn(email, password)
      .then(res => {
        const user = res.user;
        setUser(user);
        setLoading(false);
        navigate(`${location.state ? location.state : '/'}`);
      })
      .catch(e => {
        toast.error(e.message);
        setLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then(res => {
        const user = res.user;
        setUser(user);
        setLoading(false);
        navigate(`${location.state ? location.state : '/'}`);
      })
      .catch(e => {
        toast.error(e.message);
        setLoading(false);
      });
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-orange-50 to-orange-100 dark:from-base-300 dark:to-base-200 py-16 transition-colors duration-300">
      <title>Login to Continue - NexTicket</title>
      <div className="w-11/12 max-w-md bg-base-100 shadow-2xl rounded-2xl p-8 border border-base-300">
        <h2 className="text-3xl font-bold text-primary text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-base-content/70 mb-6">
          Log in to continue exploring NexTicket
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-base-content font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              ref={emailRef}
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

          {/* Forgot Password */}
          <button type="button">
            <span className="text-base-content/60 text-sm font-medium text-right block cursor-pointer hover:text-primary transition-colors">
              Forgot Password?
            </span>
          </button>

          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-primary w-full font-semibold"
          >
            Login
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
          Don't have an account?{' '}
          <Link
            to="/auth/register"
            className="text-primary font-semibold hover:text-secondary transition-colors"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
