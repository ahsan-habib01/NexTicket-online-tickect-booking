import { useNavigate, useRouteError } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  const [countdown, setCountdown] = useState(10);

  // Auto redirect countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  // Determine error type
  const is404 = error?.status === 404 || !error?.status;
  const errorStatus = error?.status || 404;
  const errorMessage = error?.statusText || error?.message || 'Page Not Found';

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5 flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full">
        {/* Main Error Card */}
        <div className="card bg-base-100 shadow-2xl border border-base-300">
          <div className="card-body items-center text-center p-8 md:p-12">
            {/* Animated Error Icon */}
            <div className="relative mb-8">
              {/* Pulsing Background Circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-error/10 animate-ping"></div>
              </div>

              {/* Main Icon */}
              <div className="relative z-10 w-48 h-48 rounded-full bg-gradient-to-br from-error/20 to-warning/20 flex items-center justify-center border-4 border-error/30">
                {is404 ? (
                  // 404 Robot Icon
                  <div className="text-8xl animate-bounce">🤖</div>
                ) : (
                  // General Error Icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24 text-error animate-pulse"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                )}
              </div>
            </div>

            {/* Error Status Code */}
            <div className="mb-4">
              <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-error via-warning to-error animate-gradient">
                {errorStatus}
              </h1>
            </div>

            {/* Error Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
              {is404 ? 'Oops! Page Not Found' : 'Something Went Wrong'}
            </h2>

            {/* Error Description */}
            <p className="text-lg text-base-content/70 mb-2 max-w-2xl">
              {is404
                ? "The page you're looking for seems to have taken a different route. It might have been moved, deleted, or never existed."
                : errorMessage}
            </p>

            {/* Helpful Message */}
            <div className="alert alert-info max-w-2xl mb-8 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <div className="text-left">
                <p className="font-semibold mb-1">
                  Don't worry, we've got you covered!
                </p>
                <p className="text-sm">
                  {is404
                    ? "You'll be automatically redirected to the homepage in "
                    : "Try refreshing the page or go back to the homepage. You'll be redirected in "}
                  <span className="font-bold text-primary">
                    {countdown} seconds
                  </span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => navigate('/')}
                className="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
                Go to Homepage
              </button>

              <button
                onClick={() => navigate(-1)}
                className="btn btn-outline btn-lg gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Go Back
              </button>

              <button
                onClick={() => navigate('/all-tickets')}
                className="btn btn-secondary btn-lg gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
                Browse Tickets
              </button>
            </div>

            {/* Divider */}
            <div className="divider my-8"></div>

            {/* Quick Links */}
            <div className="w-full max-w-2xl">
              <h3 className="text-xl font-bold text-base-content mb-4">
                Popular Pages
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={() => navigate('/')}
                  className="btn btn-ghost btn-sm justify-start"
                >
                  🏠 Home
                </button>
                <button
                  onClick={() => navigate('/all-tickets')}
                  className="btn btn-ghost btn-sm justify-start"
                >
                  🎫 All Tickets
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="btn btn-ghost btn-sm justify-start"
                >
                  🔐 Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="btn btn-ghost btn-sm justify-start"
                >
                  📝 Register
                </button>
              </div>
            </div>

            {/* Error Details (For Development) */}
            {import.meta.env.DEV && error && (
              <details className="mt-8 w-full max-w-2xl text-left">
                <summary className="btn btn-ghost btn-sm mb-2 cursor-pointer">
                  🔧 Developer Info (DEV mode only)
                </summary>
                <div className="bg-base-200 p-4 rounded-lg text-sm font-mono overflow-auto">
                  <p className="mb-2">
                    <strong>Status:</strong> {error.status}
                  </p>
                  <p className="mb-2">
                    <strong>Status Text:</strong> {error.statusText}
                  </p>
                  {error.message && (
                    <p className="mb-2">
                      <strong>Message:</strong> {error.message}
                    </p>
                  )}
                  {error.stack && (
                    <p>
                      <strong>Stack:</strong>
                      <pre className="mt-2 text-xs overflow-auto">
                        {error.stack}
                      </pre>
                    </p>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>

        {/* Fun Messages */}
        <div className="text-center mt-6 text-base-content/60">
          <p className="text-sm italic">
            {is404
              ? '"Not all who wander are lost, but this page definitely is." 🗺️'
              : '"Even the best systems have hiccups. We\'re on it!" 🔧'}
          </p>
        </div>
      </div>

      {/* Add custom CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default ErrorPage;
