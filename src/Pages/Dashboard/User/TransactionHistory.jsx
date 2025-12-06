import { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { paymentAPI } from '../../../utils/api';
import toast from 'react-hot-toast';

const TransactionHistory = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchTransactions();
    }
  }, [user]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await paymentAPI.getUserTransactions(user.email);

      if (response.success) {
        setTransactions(response.data);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast.error('Failed to load transactions');
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

  if (transactions.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">No Transactions Yet</h2>
        <p className="text-gray-500 mb-6">
          Your payment history will appear here after making purchases
        </p>
        <a href="/all-tickets" className="btn btn-primary">
          Browse Tickets
        </a>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Transaction History</h1>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Ticket</th>
                  <th>Amount</th>
                  <th>Payment Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction._id}>
                    <td>
                      <code className="text-xs bg-base-200 px-2 py-1 rounded">
                        {transaction.transactionId}
                      </code>
                    </td>
                    <td>
                      <div>
                        <div className="font-semibold">
                          {transaction.ticketTitle}
                        </div>
                        <div className="text-sm text-gray-500">
                          Booking ID: {transaction.bookingId?.slice(-8)}
                        </div>
                      </div>
                    </td>
                    <td className="font-semibold text-primary">
                      ৳{transaction.amount}
                    </td>
                    <td>
                      {new Date(transaction.paymentDate).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        }
                      )}
                    </td>
                    <td>
                      <span className="badge badge-success">
                        {transaction.status || 'Completed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="divider"></div>

          {/* Summary */}
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Total Transactions</div>
              <div className="stat-value text-primary">
                {transactions.length}
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Total Spent</div>
              <div className="stat-value text-success">
                ৳
                {transactions.reduce(
                  (sum, transaction) => sum + transaction.amount,
                  0
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
