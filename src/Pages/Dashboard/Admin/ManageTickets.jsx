import { useEffect, useState } from 'react';
import { ticketAPI } from '../../../utils/api';
import toast from 'react-hot-toast';

const ManageTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending'); // pending, approved, rejected, all

  useEffect(() => {
    fetchTickets();
  }, [filter]);

  const fetchTickets = async () => {
    try {
      setLoading(true);

      let response;
      if (filter === 'pending') {
        response = await ticketAPI.getPendingTickets();
      } else {
        // Fetch all tickets and filter on frontend
        response = await ticketAPI.getAllTickets({ limit: 1000 });
        if (filter !== 'all' && response.success) {
          response.data = response.data.filter(
            ticket => ticket.verificationStatus === filter
          );
        }
      }

      if (response.success) {
        setTickets(response.data);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async id => {
    try {
      const response = await ticketAPI.verifyTicket(id, 'approved');

      if (response.success) {
        toast.success('Ticket approved successfully');
        // Update local state
        setTickets(
          tickets.map(ticket =>
            ticket._id === id
              ? { ...ticket, verificationStatus: 'approved' }
              : ticket
          )
        );
      }
    } catch (error) {
      console.error('Error approving ticket:', error);
      toast.error('Failed to approve ticket');
    }
  };

  const handleReject = async id => {
    if (!confirm('Are you sure you want to reject this ticket?')) return;

    try {
      const response = await ticketAPI.verifyTicket(id, 'rejected');

      if (response.success) {
        toast.success('Ticket rejected');
        // Update local state
        setTickets(
          tickets.map(ticket =>
            ticket._id === id
              ? { ...ticket, verificationStatus: 'rejected' }
              : ticket
          )
        );
      }
    } catch (error) {
      console.error('Error rejecting ticket:', error);
      toast.error('Failed to reject ticket');
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Tickets</h1>

        {/* Filter Tabs */}
        <div className="tabs tabs-boxed">
          <button
            className={`tab ${filter === 'pending' ? 'tab-active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button
            className={`tab ${filter === 'approved' ? 'tab-active' : ''}`}
            onClick={() => setFilter('approved')}
          >
            Approved
          </button>
          <button
            className={`tab ${filter === 'rejected' ? 'tab-active' : ''}`}
            onClick={() => setFilter('rejected')}
          >
            Rejected
          </button>
          <button
            className={`tab ${filter === 'all' ? 'tab-active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
        </div>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">No Tickets Found</h2>
          <p className="text-gray-500">No {filter} tickets at the moment</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Ticket Details</th>
                <th>Vendor</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(ticket => (
                <tr key={ticket._id}>
                  <td>
                    <div className="avatar">
                      <div className="w-16 h-16 rounded">
                        <img
                          src={
                            ticket.imageURL || 'https://via.placeholder.com/100'
                          }
                          alt={ticket.title}
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="font-semibold">{ticket.title}</div>
                      <div className="text-sm text-gray-500">
                        {ticket.fromLocation} → {ticket.toLocation}
                      </div>
                      <div className="badge badge-outline badge-sm mt-1">
                        {ticket.transportType}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="font-semibold text-sm">
                        {ticket.vendorName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {ticket.vendorEmail}
                      </div>
                    </div>
                  </td>
                  <td className="font-semibold text-primary">
                    ৳{ticket.pricePerUnit}
                  </td>
                  <td className="text-center font-semibold">
                    {ticket.quantity}
                  </td>
                  <td>
                    <span
                      className={`badge ${getStatusBadge(
                        ticket.verificationStatus
                      )}`}
                    >
                      {ticket.verificationStatus}
                    </span>
                  </td>
                  <td>
                    {ticket.verificationStatus === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(ticket._id)}
                          className="btn btn-success btn-xs"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(ticket._id)}
                          className="btn btn-error btn-xs"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                    {ticket.verificationStatus === 'approved' && (
                      <span className="text-success text-xs">✓ Approved</span>
                    )}
                    {ticket.verificationStatus === 'rejected' && (
                      <span className="text-error text-xs">✗ Rejected</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageTickets;
