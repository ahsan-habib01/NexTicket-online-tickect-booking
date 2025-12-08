import React from 'react';
import { Link } from 'react-router';

const PopularRoutes = () => {
  const routes = [
    { from: 'Dhaka', to: 'Chittagong', trips: '50+', color: 'bg-blue-500' },
    { from: 'Dhaka', to: 'Sylhet', trips: '40+', color: 'bg-green-500' },
    { from: 'Dhaka', to: "Cox's Bazar", trips: '30+', color: 'bg-orange-500' },
    { from: 'Chittagong', to: 'Sylhet', trips: '25+', color: 'bg-purple-500' },
    { from: 'Dhaka', to: 'Rajshahi', trips: '35+', color: 'bg-indigo-500' },
    { from: 'Dhaka', to: 'Khulna', trips: '28+', color: 'bg-teal-500' },
  ];

  return (
    <section className="container mx-auto px-4 py-16 bg-base-200 dark:bg-gray-800">
      {/* Section Header */}
      <div className="text-center mb-12 animate-fadeIn">
        <div className="inline-block px-4 py-2 bg-warning/10 rounded-full mb-4">
          <span className="text-warning font-semibold text-sm">
            🗺️ TRENDING
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Popular Routes</h2>
        <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
          Discover the most traveled destinations
        </p>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {routes.map((route, index) => (
          <Link
            key={index}
            to={`/all-tickets?fromLocation=${route.from}&toLocation=${route.to}`}
            className="card bg-gradient-to-br from-primary to-secondary text-primary-content hover:shadow-2xl transition-all duration-500 overflow-hidden group animate-scaleIn"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="card-body relative">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 text-9xl opacity-10 transform group-hover:scale-110 transition-transform duration-500">
                🚌
              </div>

              {/* Trips Badge */}
              <div className="badge badge-accent badge-sm absolute top-4 right-4">
                {route.trips} daily
              </div>

              {/* Route Info */}
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-2">{route.from}</h3>

                {/* Arrow */}
                <div className="flex items-center gap-4 my-4">
                  <div className="flex-1 h-1 bg-primary-content/30 rounded"></div>
                  <svg
                    className="w-8 h-8 transform group-hover:translate-x-2 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                  <div className="flex-1 h-1 bg-primary-content/30 rounded"></div>
                </div>

                <h3 className="text-3xl font-bold mb-4">{route.to}</h3>

                {/* CTA */}
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>Search Tickets</span>
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Statistics */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 animate-fadeIn"
        style={{ animationDelay: '0.6s' }}
      >
        {[
          { number: '50+', label: 'Routes', icon: '🗺️' },
          { number: '1000+', label: 'Daily Trips', icon: '🚌' },
          { number: '98%', label: 'On-Time', icon: '⏱️' },
          { number: '5000+', label: 'Happy Customers', icon: '😊' },
        ].map((stat, index) => (
          <div
            key={index}
            className="stat bg-base-100 dark:bg-gray-900 rounded-box shadow-lg"
          >
            <div className="stat-figure text-4xl">{stat.icon}</div>
            <div className="stat-title">{stat.label}</div>
            <div className="stat-value text-primary">{stat.number}</div>
          </div>
        ))}
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default PopularRoutes;
