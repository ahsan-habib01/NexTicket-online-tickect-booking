// API Base URL - change in .env.local for production
const API_URL =
  import.meta.env.VITE_API_URL || 'https://nex-ticket-server.vercel.app';

// ============================================
// HELPER FUNCTION: Make API Calls
// ============================================
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// ============================================
// USER API CALLS
// ============================================
export const userAPI = {
  // Create or update user after Firebase authentication
  saveUser: async userData => {
    return apiCall('/api/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Get user by email
  getUserByEmail: async email => {
    return apiCall(`/api/users/${email}`);
  },

  // Get all users (Admin only)
  getAllUsers: async () => {
    return apiCall('/api/users');
  },

  // Update user role (Admin only)
  updateUserRole: async (email, role) => {
    return apiCall(`/api/users/${email}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    });
  },

  // Mark vendor as fraud (Admin only)
  markVendorAsFraud: async email => {
    return apiCall(`/api/users/${email}/fraud`, {
      method: 'PATCH',
      body: JSON.stringify({ isFraud: true }),
    });
  },
};

// ============================================
// TICKET API CALLS
// ============================================
export const ticketAPI = {
  // Get all approved tickets (for All Tickets page)
  getAllTickets: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/api/tickets${queryString ? `?${queryString}` : ''}`);
  },

  // Get single ticket by ID
  getTicketById: async id => {
    return apiCall(`/api/tickets/${id}`);
  },

  // Get advertised tickets (for homepage)
  getAdvertisedTickets: async () => {
    return apiCall('/api/tickets/advertised');
  },

  // Get latest tickets (for homepage)
  getLatestTickets: async () => {
    return apiCall('/api/tickets/latest');
  },

  // Get vendor's tickets
  getVendorTickets: async email => {
    return apiCall(`/api/tickets/vendor/${email}`);
  },

  // Add new ticket (Vendor only)
  addTicket: async ticketData => {
    return apiCall('/api/tickets', {
      method: 'POST',
      body: JSON.stringify(ticketData),
    });
  },

  // Update ticket (Vendor only)
  updateTicket: async (id, ticketData) => {
    return apiCall(`/api/tickets/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(ticketData),
    });
  },

  // Delete ticket (Vendor only)
  deleteTicket: async id => {
    return apiCall(`/api/tickets/${id}`, {
      method: 'DELETE',
    });
  },

  // Get pending tickets (Admin only)
  getPendingTickets: async () => {
    return apiCall('/api/tickets/pending');
  },

  // Verify ticket (Admin only)
  verifyTicket: async (id, status) => {
    return apiCall(`/api/tickets/${id}/verify`, {
      method: 'PATCH',
      body: JSON.stringify({ verificationStatus: status }),
    });
  },

  // Toggle advertise (Admin only)
  toggleAdvertise: async (id, isAdvertised) => {
    return apiCall(`/api/tickets/${id}/advertise`, {
      method: 'PATCH',
      body: JSON.stringify({ isAdvertised }),
    });
  },

  // Get all tickets for admin (including pending/rejected)
  getAllTicketsAdmin: async () => {
    return apiCall('/api/tickets/all-admin');
  },
};

// ============================================
// BOOKING API CALLS
// ============================================
export const bookingAPI = {
  // Create booking (User only)
  createBooking: async bookingData => {
    return apiCall('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  // Get user's bookings
  getUserBookings: async email => {
    return apiCall(`/api/bookings/user/${email}`);
  },

  // Get vendor's booking requests
  getVendorBookings: async email => {
    return apiCall(`/api/bookings/vendor/${email}`);
  },

  // Accept booking (Vendor only)
  acceptBooking: async id => {
    return apiCall(`/api/bookings/${id}/accept`, {
      method: 'PATCH',
    });
  },

  // Reject booking (Vendor only)
  rejectBooking: async id => {
    return apiCall(`/api/bookings/${id}/reject`, {
      method: 'PATCH',
    });
  },

  // Update booking to paid (after payment)
  markAsPaid: async (id, transactionId) => {
    return apiCall(`/api/bookings/${id}/pay`, {
      method: 'PATCH',
      body: JSON.stringify({ transactionId }),
    });
  },
};

// ============================================
// PAYMENT API CALLS
// ============================================
export const paymentAPI = {
  // Create payment intent
  createPaymentIntent: async amount => {
    return apiCall('/api/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });
  },

  // Save transaction
  saveTransaction: async transactionData => {
    return apiCall('/api/transactions', {
      method: 'POST',
      body: JSON.stringify(transactionData),
    });
  },

  // Get user's transactions
  getUserTransactions: async email => {
    return apiCall(`/api/transactions/${email}`);
  },
};

// ============================================
// STATS API CALLS
// ============================================
export const statsAPI = {
  // Get vendor revenue stats
  getVendorStats: async email => {
    return apiCall(`/api/stats/vendor/${email}`);
  },
};

// ============================================
// TEST CONNECTION
// ============================================
export const testConnection = async () => {
  try {
    const response = await fetch(`${API_URL}/`);
    const data = await response.json();
    console.log('✅ Backend connection successful:', data);
    return data;
  } catch (error) {
    console.error('❌ Backend connection failed:', error);
    throw error;
  }
};

export default {
  userAPI,
  ticketAPI,
  bookingAPI,
  paymentAPI,
  statsAPI,
  testConnection,
};
