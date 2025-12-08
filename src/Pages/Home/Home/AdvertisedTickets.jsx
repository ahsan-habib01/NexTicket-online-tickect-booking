import React, { useEffect, useState } from 'react';
import { ticketAPI } from '../../../utils/api';
import TicketCard from '../../../Components/TicketCard';
import toast from 'react-hot-toast';

const AdvertisedTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdvertisedTickets();
  }, []);

  const fetchAdvertisedTickets = async () => {
    try {
      setLoading(true);
      const response = await ticketAPI.getAdvertisedTickets();
      if (response.success) {
        // Ensure exactly 6 tickets as per requirement
        setTickets(response.data.slice(0, 6));
      }
    } catch (error) {
      console.error('Error fetching advertised tickets:', error);
      toast.error('Failed to load featured tickets');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center min-h-[400px]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </section>
    );
  }

  if (tickets.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-16 bg-base-100 dark:bg-gray-900">
      {/* Section Header */}
      <div className="text-center mb-12 animate-fadeIn">
        <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
          <span className="text-primary font-semibold text-sm">
            ⭐ ADMIN'S CHOICE
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Advertisement Section
        </h2>
        <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
          Handpicked tickets specially chosen by our admin - Exactly 6 featured
          options
        </p>
      </div>

      {/* Tickets Grid - Using YOUR TicketCard component */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket, index) => (
          <div
            key={ticket._id}
            className="animate-slideUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <TicketCard ticket={ticket} />
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

export default AdvertisedTickets;
