import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import { ticketAPI } from '../../../utils/api';
import toast from 'react-hot-toast';

const MyAddedTickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchMyTickets();
    }
  }, [user]);

  const fetchMyTickets = async () => {
    try {
      setLoading(true);
      const response = await ticketAPI.getVendorTickets(user.email);

      if (response.success) {
        setTickets(response.data);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Failed to load your tickets');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async id => {
    if (!confirm('Are you sure you want to delete this ticket?')) return;

    try {
      const response = await ticketAPI.deleteTicket(id);

      if (response.success) {
        toast.success('Ticket deleted successfully');
        setTickets(tickets.filter(ticket => ticket._id !== id));
      }
    } catch (error) {
      console.error('Error deleting ticket:', error);
      toast.error('Failed to delete ticket');
    }
  };

  const getStatusBadge = status => {
    const badges = {
      pending: 'badge-warning',
      approved: 'badge-success',
      rejected: 'badge-error',
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

  if (tickets.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">No Tickets Added Yet</h2>
        <p className="text-gray-500 mb-6">
          Start adding tickets to see them here
        </p>
        <Link to="/dashboard/vendor/add-ticket" className="btn btn-primary">
          Add Your First Ticket
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <title>Vendor Dashboard - My Added Tickets</title>
        <h1 className="text-3xl font-bold">My Added Tickets</h1>
        <Link to="/dashboard/vendor/add-ticket" className="btn btn-primary">
          Add New Ticket
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map(ticket => (
          <div key={ticket._id} className="card bg-base-100 shadow-xl">
            <figure className="h-48">
              <img
                src={ticket.imageURL || 'https://via.placeholder.com/400x200'}
                alt={ticket.title}
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="card-body">
              {/* Status Badge */}
              <div className="flex justify-between items-start">
                <span
                  className={`badge ${getStatusBadge(
                    ticket.verificationStatus
                  )}`}
                >
                  {ticket.verificationStatus}
                </span>
                <span className="badge badge-outline">
                  {ticket.transportType}
                </span>
              </div>

              {/* Title */}
              <h2 className="card-title text-lg">{ticket.title}</h2>

              {/* Route */}
              <p className="text-sm text-gray-600">
                {ticket.fromLocation} → {ticket.toLocation}
              </p>

              {/* Details */}
              <div className="flex justify-between text-sm mt-2">
                <div>
                  <p className="font-semibold text-primary">
                    ৳{ticket.pricePerUnit}
                  </p>
                  <p className="text-xs text-gray-500">per ticket</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{ticket.quantity} left</p>
                  <p className="text-xs text-gray-500">tickets</p>
                </div>
              </div>

              {/* Departure */}
              <div className="text-sm text-gray-600 mt-2">
                <p>📅 {new Date(ticket.departureDate).toLocaleDateString()}</p>
                <p>🕐 {ticket.departureTime}</p>
              </div>

              {/* Actions */}
              <div className="card-actions justify-end mt-4">
                <button
                  className="btn btn-sm btn-outline btn-primary"
                  disabled={ticket.verificationStatus === 'rejected'}
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(ticket._id)}
                  className="btn btn-sm btn-outline btn-error"
                  disabled={ticket.verificationStatus === 'rejected'}
                >
                  Delete
                </button>
              </div>

              {ticket.verificationStatus === 'rejected' && (
                <div className="alert alert-error mt-2">
                  <span className="text-xs">
                    Cannot modify rejected tickets
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAddedTickets;
