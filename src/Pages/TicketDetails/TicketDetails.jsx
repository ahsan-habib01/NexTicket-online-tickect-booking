import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { ticketAPI, bookingAPI } from '../../utils/api';
import toast from 'react-hot-toast';

const TicketDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState('');
  const [isPast, setIsPast] = useState(false);

  // Booking modal state
  const [showModal, setShowModal] = useState(false);
  const [bookingQuantity, setBookingQuantity] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchTicketDetails();
  }, [id]);

  // Countdown timer
  useEffect(() => {
    if (!ticket) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const departureDateTime = new Date(
        `${ticket.departureDate}T${ticket.departureTime}`
      ).getTime();
      const distance = departureDateTime - now;

      if (distance < 0) {
        setCountdown('Departed');
        setIsPast(true);
        clearInterval(timer);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        setIsPast(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [ticket]);

  const fetchTicketDetails = async () => {
    try {
      setLoading(true);
      const response = await ticketAPI.getTicketById(id);

      if (response.success) {
        setTicket(response.data);
      } else {
        toast.error('Ticket not found');
        navigate('/all-tickets');
      }
    } catch (error) {
      console.error('Error fetching ticket:', error);
      toast.error('Failed to load ticket details');
      navigate('/all-tickets');
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    setShowModal(true);
    setBookingQuantity(1);
  };

  const handleBookingSubmit = async e => {
    e.preventDefault();

    if (bookingQuantity < 1 || bookingQuantity > ticket.quantity) {
      toast.error(`Please enter a quantity between 1 and ${ticket.quantity}`);
      return;
    }

    try {
      setBookingLoading(true);

      const bookingData = {
        ticketId: ticket._id,
        ticketTitle: ticket.title,
        userId: user.uid,
        userEmail: user.email,
        vendorEmail: ticket.vendorEmail,
        bookingQuantity: parseInt(bookingQuantity),
        totalPrice: ticket.pricePerUnit * bookingQuantity,
        fromLocation: ticket.fromLocation,
        toLocation: ticket.toLocation,
        departureDate: ticket.departureDate,
        departureTime: ticket.departureTime,
        status: 'pending',
      };

      const response = await bookingAPI.createBooking(bookingData);

      if (response.success) {
        toast.success('Booking request sent! Waiting for vendor approval.');
        setShowModal(false);
        navigate('/dashboard/user/bookings');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Failed to create booking');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!ticket) {
    return <div className="text-center py-16">Ticket not found</div>;
  }

  const isBookingDisabled = isPast || ticket.quantity === 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline btn-sm mb-6"
        >
          ← Back
        </button>

        <div className="card bg-base-100 shadow-xl">
          {/* Image */}
          <figure className="h-96">
            <img
              src={ticket.imageURL || 'https://via.placeholder.com/800x400'}
              alt={ticket.title}
              className="w-full h-full object-cover"
            />
          </figure>

          <div className="card-body">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">{ticket.title}</h1>
                <div className="badge badge-primary">
                  {ticket.transportType}
                </div>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-primary">
                  ৳{ticket.pricePerUnit}
                </p>
                <p className="text-sm text-gray-500">per ticket</p>
              </div>
            </div>

            <div className="divider"></div>

            {/* Route & Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Route</h3>
                  <div className="flex items-center gap-3 text-lg">
                    <span className="font-semibold">{ticket.fromLocation}</span>
                    <span className="text-2xl">→</span>
                    <span className="font-semibold">{ticket.toLocation}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Departure</h3>
                  <p className="text-gray-700">
                    📅{' '}
                    {new Date(ticket.departureDate).toLocaleDateString(
                      'en-US',
                      {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }
                    )}
                  </p>
                  <p className="text-gray-700">🕐 {ticket.departureTime}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Available Tickets
                  </h3>
                  <p className="text-2xl font-bold">
                    {ticket.quantity}
                    {ticket.quantity === 0 && (
                      <span className="badge badge-error ml-2">Sold Out</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Countdown</h3>
                  <div
                    className={`text-3xl font-bold ${
                      isPast ? 'text-error' : 'text-success'
                    }`}
                  >
                    {countdown}
                  </div>
                </div>

                {ticket.perks && ticket.perks.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Perks</h3>
                    <div className="flex flex-wrap gap-2">
                      {ticket.perks.map((perk, index) => (
                        <span
                          key={index}
                          className="badge badge-outline badge-lg"
                        >
                          ✓ {perk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-lg mb-2">Vendor</h3>
                  <p className="text-gray-700">{ticket.vendorName}</p>
                  <p className="text-sm text-gray-500">{ticket.vendorEmail}</p>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            {/* Book Now Button */}
            <div className="card-actions justify-center">
              <button
                onClick={handleBookNow}
                disabled={isBookingDisabled}
                className="btn btn-primary btn-lg w-full md:w-auto"
              >
                {isPast
                  ? 'Departed'
                  : ticket.quantity === 0
                  ? 'Sold Out'
                  : 'Book Now'}
              </button>
            </div>

            {isBookingDisabled && (
              <div className="alert alert-warning mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>
                  {isPast
                    ? 'This ticket has already departed'
                    : 'No tickets available'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Book Tickets</h3>

            <form onSubmit={handleBookingSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">
                    How many tickets do you want?
                  </span>
                </label>
                <input
                  type="number"
                  min="1"
                  max={ticket.quantity}
                  value={bookingQuantity}
                  onChange={e => setBookingQuantity(e.target.value)}
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <span className="label-text-alt">
                    Available: {ticket.quantity} tickets
                  </span>
                </label>
              </div>

              <div className="bg-base-200 p-4 rounded-lg mb-4">
                <div className="flex justify-between mb-2">
                  <span>Price per ticket:</span>
                  <span className="font-semibold">৳{ticket.pricePerUnit}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Quantity:</span>
                  <span className="font-semibold">{bookingQuantity}</span>
                </div>
                <div className="divider my-2"></div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">
                    ৳{ticket.pricePerUnit * bookingQuantity}
                  </span>
                </div>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-outline"
                  disabled={bookingLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={bookingLoading}
                >
                  {bookingLoading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Booking...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>
              </div>
            </form>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setShowModal(false)}
          ></div>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;
