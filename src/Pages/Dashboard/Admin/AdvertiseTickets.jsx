import { useEffect, useState } from 'react';
import { ticketAPI } from '../../../utils/api';
import toast from 'react-hot-toast';

const AdvertiseTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [advertisedCount, setAdvertisedCount] = useState(0);

  useEffect(() => {
    fetchApprovedTickets();
  }, []);

  const fetchApprovedTickets = async () => {
    try {
      setLoading(true);
      const response = await ticketAPI.getAllTickets({ limit: 1000 });

      if (response.success) {
        setTickets(response.data);
        // Count advertised tickets
        const count = response.data.filter(t => t.isAdvertised).length;
        setAdvertisedCount(count);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAdvertise = async (ticketId, currentStatus) => {
    // If trying to advertise and already have 6
    if (!currentStatus && advertisedCount >= 6) {
      toast.error(
        'Cannot advertise more than 6 tickets. Unadvertise one first.'
      );
      return;
    }

    try {
      const response = await ticketAPI.toggleAdvertise(
        ticketId,
        !currentStatus
      );

      if (response.success) {
        toast.success(
          currentStatus
            ? 'Ticket unadvertised successfully'
            : 'Ticket advertised successfully'
        );

        // Update local state
        setTickets(
          tickets.map(ticket =>
            ticket._id === ticketId
              ? { ...ticket, isAdvertised: !currentStatus }
              : ticket
          )
        );

        // Update count
        setAdvertisedCount(prev => (currentStatus ? prev - 1 : prev + 1));
      }
    } catch (error) {
      console.error('Error toggling advertise:', error);
      toast.error(error.message || 'Failed to update advertisement');
    }
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
        <h1 className="text-3xl font-bold">Advertise Tickets</h1>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Advertised</div>
            <div className="stat-value text-primary">{advertisedCount} / 6</div>
            <div className="stat-desc">
              {advertisedCount < 6
                ? `${6 - advertisedCount} slots available`
                : 'Maximum reached'}
            </div>
          </div>
        </div>
      </div>

      {advertisedCount >= 6 && (
        <div className="alert alert-warning mb-6">
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
            Maximum 6 tickets advertised. Unadvertise one to add more.
          </span>
        </div>
      )}

      {tickets.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">No Approved Tickets</h2>
          <p className="text-gray-500">Approve tickets to advertise them</p>
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
                <th>Advertised</th>
                <th>Action</th>
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
                  <td>
                    {ticket.isAdvertised ? (
                      <span className="badge badge-success">Yes</span>
                    ) : (
                      <span className="badge badge-ghost">No</span>
                    )}
                  </td>
                  <td>
                    <label className="swap">
                      <input
                        type="checkbox"
                        checked={ticket.isAdvertised}
                        onChange={() =>
                          handleToggleAdvertise(ticket._id, ticket.isAdvertised)
                        }
                      />
                      <div className="swap-on btn btn-success btn-sm">
                        Unadvertise
                      </div>
                      <div className="swap-off btn btn-outline btn-sm">
                        Advertise
                      </div>
                    </label>
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

export default AdvertiseTickets;
