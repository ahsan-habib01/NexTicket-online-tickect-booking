import { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { bookingAPI } from '../../../utils/api';
import toast from 'react-hot-toast';

const RequestedBookings = () => {
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
      const response = await bookingAPI.getVendorBookings(user.email);

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

  const handleAccept = async id => {
    try {
      const response = await bookingAPI.acceptBooking(id);

      if (response.success) {
        toast.success('Booking accepted successfully');
        // Update local state
        setBookings(
          bookings.map(booking =>
            booking._id === id ? { ...booking, status: 'accepted' } : booking
          )
        );
      }
    } catch (error) {
      console.error('Error accepting booking:', error);
      toast.error('Failed to accept booking');
    }
  };

  const handleReject = async id => {
    if (!confirm('Are you sure you want to reject this booking?')) return;

    try {
      const response = await bookingAPI.rejectBooking(id);

      if (response.success) {
        toast.success('Booking rejected');
        // Update local state
        setBookings(
          bookings.map(booking =>
            booking._id === id ? { ...booking, status: 'rejected' } : booking
          )
        );
      }
    } catch (error) {
      console.error('Error rejecting booking:', error);
      toast.error('Failed to reject booking');
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
        <h2 className="text-2xl font-bold mb-4">No Booking Requests</h2>
        <p className="text-gray-500">Booking requests will appear here</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Requested Bookings</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>User</th>
              <th>Ticket</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id}>
                <td>
                  <div>
                    <div className="font-semibold">{booking.userEmail}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-semibold">{booking.ticketTitle}</div>
                    <div className="text-sm text-gray-500">
                      {booking.fromLocation} → {booking.toLocation}
                    </div>
                  </div>
                </td>
                <td className="text-center font-semibold">
                  {booking.bookingQuantity}
                </td>
                <td className="font-semibold text-primary">
                  ৳{booking.totalPrice}
                </td>
                <td>
                  <span className={`badge ${getStatusBadge(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
                <td>
                  {booking.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAccept(booking._id)}
                        className="btn btn-success btn-sm"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(booking._id)}
                        className="btn btn-error btn-sm"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {booking.status === 'accepted' && (
                    <span className="text-success text-sm">
                      Waiting for payment
                    </span>
                  )}
                  {booking.status === 'rejected' && (
                    <span className="text-error text-sm">Rejected</span>
                  )}
                  {booking.status === 'paid' && (
                    <span className="text-info text-sm">✓ Paid</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedBookings;
