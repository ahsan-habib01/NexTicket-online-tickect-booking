import { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { statsAPI } from '../../../utils/api';
import toast from 'react-hot-toast';

const RevenueOverview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalTicketsSold: 0,
    totalTicketsAdded: 0,
    pendingBookings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await statsAPI.getVendorStats(user.email);

      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Failed to load revenue data');
    } finally {
      setLoading(false);
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
      <h1 className="text-3xl font-bold mb-6">Revenue Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Revenue */}
        <div className="card bg-gradient-to-r from-green-500 to-green-600 text-white shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-white/80">Total Revenue</h2>
            <p className="text-4xl font-bold">৳{stats.totalRevenue}</p>
            <p className="text-sm text-white/80">From paid bookings</p>
          </div>
        </div>

        {/* Total Tickets Sold */}
        <div className="card bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-white/80">Tickets Sold</h2>
            <p className="text-4xl font-bold">{stats.totalTicketsSold}</p>
            <p className="text-sm text-white/80">Total tickets sold</p>
          </div>
        </div>

        {/* Total Tickets Added */}
        <div className="card bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-white/80">Tickets Added</h2>
            <p className="text-4xl font-bold">{stats.totalTicketsAdded}</p>
            <p className="text-sm text-white/80">Total tickets created</p>
          </div>
        </div>
      </div>

      {/* Additional Info Card */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4">Summary</h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
              <span className="font-semibold">Average Revenue per Ticket:</span>
              <span className="text-xl font-bold text-primary">
                ৳
                {stats.totalTicketsSold > 0
                  ? Math.round(stats.totalRevenue / stats.totalTicketsSold)
                  : 0}
              </span>
            </div>

            <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
              <span className="font-semibold">Pending Bookings:</span>
              <span className="text-xl font-bold text-warning">
                {stats.pendingBookings}
              </span>
            </div>

            <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
              <span className="font-semibold">Sell Rate:</span>
              <span className="text-xl font-bold text-success">
                {stats.totalTicketsAdded > 0
                  ? Math.round(
                      (stats.totalTicketsSold / stats.totalTicketsAdded) * 100
                    )
                  : 0}
                %
              </span>
            </div>
          </div>

          <div className="divider"></div>

          <div className="alert alert-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>Keep adding quality tickets to increase your revenue!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueOverview;
