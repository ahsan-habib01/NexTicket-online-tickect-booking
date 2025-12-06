import { useEffect, useState } from 'react';
import { userAPI } from '../../../utils/api';
import toast from 'react-hot-toast';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAllUsers();

      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleMakeAdmin = async email => {
    if (!confirm('Make this user an Admin?')) return;

    try {
      const response = await userAPI.updateUserRole(email, 'admin');

      if (response.success) {
        toast.success('User is now an Admin');
        // Update local state
        setUsers(
          users.map(user =>
            user.email === email ? { ...user, role: 'admin' } : user
          )
        );
      }
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Failed to update role');
    }
  };

  const handleMakeVendor = async email => {
    if (!confirm('Make this user a Vendor?')) return;

    try {
      const response = await userAPI.updateUserRole(email, 'vendor');

      if (response.success) {
        toast.success('User is now a Vendor');
        // Update local state
        setUsers(
          users.map(user =>
            user.email === email ? { ...user, role: 'vendor' } : user
          )
        );
      }
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Failed to update role');
    }
  };

  const handleMarkFraud = async email => {
    if (
      !confirm('Mark this vendor as FRAUD? This will hide all their tickets!')
    )
      return;

    try {
      const response = await userAPI.markVendorAsFraud(email);

      if (response.success) {
        toast.success('Vendor marked as fraud');
        // Update local state
        setUsers(
          users.map(user =>
            user.email === email ? { ...user, isFraud: true } : user
          )
        );
      }
    } catch (error) {
      console.error('Error marking fraud:', error);
      toast.error('Failed to mark as fraud');
    }
  };

  const getRoleBadge = role => {
    const badges = {
      admin: 'badge-error',
      vendor: 'badge-primary',
      user: 'badge-info',
    };
    return badges[role] || 'badge-neutral';
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
        <h1 className="text-3xl font-bold">Manage Users</h1>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Users</div>
            <div className="stat-value text-primary">{users.length}</div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img
                        src={user.photoURL || 'https://via.placeholder.com/100'}
                        alt={user.name}
                      />
                    </div>
                  </div>
                </td>
                <td className="font-semibold">{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge ${getRoleBadge(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  {user.isFraud ? (
                    <span className="badge badge-error">FRAUD</span>
                  ) : (
                    <span className="badge badge-success">Active</span>
                  )}
                </td>
                <td>
                  <div className="flex flex-col gap-1">
                    {user.role !== 'admin' && (
                      <button
                        onClick={() => handleMakeAdmin(user.email)}
                        className="btn btn-xs btn-outline btn-error"
                      >
                        Make Admin
                      </button>
                    )}
                    {user.role !== 'vendor' && (
                      <button
                        onClick={() => handleMakeVendor(user.email)}
                        className="btn btn-xs btn-outline btn-primary"
                      >
                        Make Vendor
                      </button>
                    )}
                    {user.role === 'vendor' && !user.isFraud && (
                      <button
                        onClick={() => handleMarkFraud(user.email)}
                        className="btn btn-xs btn-outline btn-warning"
                      >
                        Mark Fraud
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
