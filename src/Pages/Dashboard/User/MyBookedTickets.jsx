import { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { bookingAPI } from '../../../utils/api';
import toast from 'react-hot-toast';

const MyBookedTickets = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingAPI.getUserBookings(user.email);

      if (response.success) {
        setBookings(response.data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = status => {
    const badges = {
      pending: 'badge-warning',
      accepted: 'badge-success',
      rejected: 'badge-error',
      paid: 'badge-info',
    };
    return badges[status] || 'badge-neutral';
  };

  const getCountdown = (departureDate, departureTime) => {
    const now = new Date().getTime();
    const departureDateTime = new Date(
      `${departureDate}T${departureTime}`
    ).getTime();
    const distance = departureDateTime - now;

    if (distance < 0) return 'Departed';

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m`;
  };

  const handlePayNow = bookingId => {
    // We'll implement Stripe payment in next step
    toast.info('Payment integration coming next!');
    // For now, just show message
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">No Bookings Yet</h2>
        <p className="text-gray-500 mb-6">
          Start booking tickets to see them here
        </p>
        <a href="/all-tickets" className="btn btn-primary">
          Browse Tickets
        </a>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Booked Tickets</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map(booking => {
          const isPast =
            new Date(`${booking.departureDate}T${booking.departureTime}`) <
            new Date();
          const canPay = booking.status === 'accepted' && !isPast;

          return (
            <div key={booking._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                {/* Status Badge */}
                <div className="flex justify-between items-start mb-2">
                  <span className={`badge ${getStatusBadge(booking.status)}`}>
                    {booking.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Title */}
                <h2 className="card-title text-lg">{booking.ticketTitle}</h2>

                {/* Route */}
                <p className="text-sm text-gray-600">
                  {booking.fromLocation} → {booking.toLocation}
                </p>

                <div className="divider my-2"></div>

                {/* Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-semibold">
                      {booking.bookingQuantity}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Price:</span>
                    <span className="font-semibold text-primary">
                      ৳{booking.totalPrice}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Departure:</span>
                    <span className="font-semibold text-xs">
                      {new Date(booking.departureDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-semibold">
                      {booking.departureTime}
                    </span>
                  </div>
                </div>

                {/* Countdown (if not rejected/departed) */}
                {booking.status !== 'rejected' && !isPast && (
                  <div className="mt-4 p-3 bg-base-200 rounded-lg text-center">
                    <p className="text-xs text-gray-500 mb-1">
                      Time until departure
                    </p>
                    <p className="font-bold text-success">
                      {getCountdown(
                        booking.departureDate,
                        booking.departureTime
                      )}
                    </p>
                  </div>
                )}

                {/* Pay Now Button */}
                {canPay && (
                  <div className="card-actions justify-end mt-4">
                    <button
                      onClick={() => handlePayNow(booking._id)}
                      className="btn btn-primary btn-sm w-full"
                    >
                      Pay Now
                    </button>
                  </div>
                )}

                {/* Status Messages */}
                {booking.status === 'pending' && (
                  <div className="alert alert-warning mt-4">
                    <span className="text-xs">Waiting for vendor approval</span>
                  </div>
                )}

                {booking.status === 'rejected' && (
                  <div className="alert alert-error mt-4">
                    <span className="text-xs">Booking rejected by vendor</span>
                  </div>
                )}

                {booking.status === 'paid' && (
                  <div className="alert alert-success mt-4">
                    <span className="text-xs">✓ Payment completed</span>
                  </div>
                )}

                {booking.status === 'accepted' && isPast && (
                  <div className="alert alert-info mt-4">
                    <span className="text-xs">
                      Cannot pay - ticket departed
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBookedTickets;
