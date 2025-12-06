import { useState, useEffect } from 'react';
import { userAPI } from '../utils/api';

/**
 * Custom hook to fetch and return user role from MongoDB
 * @param {string} email - User's email address
 * @returns {Object} - { role, loading, error, refetch }
 */
export const useUserRole = email => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserRole = async () => {
    if (!email) {
      setLoading(false);
      setRole(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await userAPI.getUserByEmail(email);

      if (response.success) {
        setRole(response.data.role);
      } else {
        setRole(null);
        setError('User not found');
      }
    } catch (err) {
      console.error('Error fetching user role:', err);
      setRole(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, [email]);

  return {
    role,
    loading,
    error,
    refetch: fetchUserRole, // Allow manual refetch
  };
};

export default useUserRole;
