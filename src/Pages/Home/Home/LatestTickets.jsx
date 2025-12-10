import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ticketAPI } from '../../../utils/api';
import TicketCard from '../../../Components/TicketCard';
import toast from 'react-hot-toast';

const LatestTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestTickets();
  }, []);

  const fetchLatestTickets = async () => {
    try {
      setLoading(true);
      const response = await ticketAPI.getLatestTickets();
      if (response.success) {
        // Show 6-8 tickets as per requirement
        setTickets(response.data.slice(0, 8));
      }
    } catch (error) {
      console.error('Error fetching latest tickets:', error);
      toast.error('Failed to load latest tickets');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-16 bg-base-200">
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
    <section className="container mx-auto px-4 py-16 bg-base-200">
      {/* Section Header */}
      <div className="text-center mb-12 animate-fadeIn">
        <div className="inline-block px-4 py-2 bg-success/10 rounded-full mb-4">
          <span className="text-success font-semibold text-sm">
            🆕 JUST ADDED
          </span>
        </div>
        <h2 className="text-base-content text-4xl md:text-5xl font-bold mb-4">
          Latest Tickets
        </h2>
        <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
          6-8 recently added tickets from our verified vendors
        </p>
      </div>

      {/* Tickets Grid - Using YOUR TicketCard component */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket, index) => (
          <div
            key={ticket._id}
            className="animate-scaleIn"
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <TicketCard ticket={ticket} />
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div
        className="text-center mt-12 animate-fadeIn"
        style={{ animationDelay: '0.6s' }}
      >
        <Link to="/all-tickets" className="btn btn-primary btn-wide btn-lg">
          View All Tickets →
        </Link>
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
            transform: scale(0.9);
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

export default LatestTickets;
