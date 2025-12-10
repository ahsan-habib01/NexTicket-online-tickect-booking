import React from 'react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: '🎫',
      title: 'Easy Booking',
      description:
        'Book tickets in just a few clicks. Simple and hassle-free process that saves your time.',
    },
    {
      icon: '💳',
      title: 'Secure Payment',
      description:
        'Pay safely with Stripe. Your transactions are fully protected with industry-standard security.',
    },
    {
      icon: '🚀',
      title: 'Instant Confirmation',
      description:
        'Get immediate booking confirmation. No waiting required, start your journey right away.',
    },
    {
      icon: '💰',
      title: 'Best Prices',
      description:
        'Compare prices from multiple vendors and get the best deals on your travel tickets.',
    },
    {
      icon: '🌟',
      title: '24/7 Support',
      description:
        'Our dedicated support team is always ready to help you with any queries or concerns.',
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      description:
        'Book tickets on the go with our responsive design. Works seamlessly on all devices.',
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16 bg-base-100">
      {/* Section Header */}
      <div className="text-center mb-12 animate-fadeIn">
        <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-4">
          <span className="text-secondary font-semibold text-sm">
            ✨ WHY US
          </span>
        </div>
        <h2 className="text-4xl text-base-content md:text-5xl font-bold mb-4">
          Why Choose NexTicket?
        </h2>
        <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
          Experience the difference with our premium booking platform
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="card bg-base-200 shadow-lg hover:shadow-2xl transition-all duration-500 animate-slideUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="card-body items-center text-center">
              {/* Icon */}
              <div className="text-6xl mb-4 transform hover:scale-110 hover:rotate-6 transition-all duration-300">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="card-title text-base-content text-2xl mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-base-content/70">{feature.description}</p>
            </div>
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

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
