import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { ticketAPI } from '../../utils/api';
import TicketCard from '../../Components/TicketCard';
import toast from 'react-hot-toast';

const AllTickets = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);

  // Filter states
  const [filters, setFilters] = useState({
    fromLocation: searchParams.get('fromLocation') || '',
    toLocation: searchParams.get('toLocation') || '',
    transportType: searchParams.get('transportType') || '',
    sortBy: searchParams.get('sortBy') || '',
    page: parseInt(searchParams.get('page')) || 1,
  });

  useEffect(() => {
    fetchTickets();
  }, [filters]);

  const fetchTickets = async () => {
    try {
      setLoading(true);

      // Build query params
      const params = {};
      if (filters.fromLocation) params.fromLocation = filters.fromLocation;
      if (filters.toLocation) params.toLocation = filters.toLocation;
      if (filters.transportType) params.transportType = filters.transportType;
      if (filters.sortBy) params.sortBy = filters.sortBy;
      params.page = filters.page;
      params.limit = 9;

      const response = await ticketAPI.getAllTickets(params);

      if (response.success) {
        setTickets(response.data);
        setPagination(response.pagination);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    setFilters(newFilters);

    // Update URL params
    const params = {};
    if (newFilters.fromLocation) params.fromLocation = newFilters.fromLocation;
    if (newFilters.toLocation) params.toLocation = newFilters.toLocation;
    if (newFilters.transportType)
      params.transportType = newFilters.transportType;
    if (newFilters.sortBy) params.sortBy = newFilters.sortBy;
    params.page = newFilters.page;

    setSearchParams(params);
  };

  const handleReset = () => {
    setFilters({
      fromLocation: '',
      toLocation: '',
      transportType: '',
      sortBy: '',
      page: 1,
    });
    setSearchParams({});
  };

  const handlePageChange = newPage => {
    setFilters({ ...filters, page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <title>See All Tickets - NexTicket</title>
      <h1 className="text-4xl font-bold mb-8 text-center">All Tickets</h1>

      {/* Filters Section */}
      <div className="card bg-base-200 shadow-lg mb-8">
        <div className="card-body">
          <h2 className="card-title mb-4">Search & Filter</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* From Location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">From Location</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Dhaka"
                value={filters.fromLocation}
                onChange={e =>
                  handleFilterChange('fromLocation', e.target.value)
                }
                className="input input-bordered"
              />
            </div>

            {/* To Location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">To Location</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Chittagong"
                value={filters.toLocation}
                onChange={e => handleFilterChange('toLocation', e.target.value)}
                className="input input-bordered"
              />
            </div>

            {/* Transport Type */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Transport Type</span>
              </label>
              <select
                value={filters.transportType}
                onChange={e =>
                  handleFilterChange('transportType', e.target.value)
                }
                className="select select-bordered"
              >
                <option value="">All Types</option>
                <option value="Bus">Bus</option>
                <option value="Train">Train</option>
                <option value="Launch">Launch</option>
                <option value="Plane">Plane</option>
              </select>
            </div>

            {/* Sort By */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Sort By Price</span>
              </label>
              <select
                value={filters.sortBy}
                onChange={e => handleFilterChange('sortBy', e.target.value)}
                className="select select-bordered"
              >
                <option value="">Default</option>
                <option value="price-low">Low to High</option>
                <option value="price-high">High to Low</option>
              </select>
            </div>
          </div>

          {/* Reset Button */}
          <div className="card-actions justify-end mt-4">
            <button onClick={handleReset} className="btn btn-outline btn-sm">
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center min-h-[400px]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* No Tickets Found */}
      {!loading && tickets.length === 0 && (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">No Tickets Found</h2>
          <p className="text-gray-500 mb-6">Try adjusting your filters</p>
          <button onClick={handleReset} className="btn btn-primary">
            Clear Filters
          </button>
        </div>
      )}

      {/* Tickets Grid */}
      {!loading && tickets.length > 0 && (
        <>
          {/* Results Info */}
          <div className="text-center mb-6">
            <p className="text-gray-600">
              Showing {tickets.length} of {pagination?.totalTickets} tickets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {tickets.map(ticket => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center">
              <div className="join">
                <button
                  className="join-item btn"
                  onClick={() => handlePageChange(filters.page - 1)}
                  disabled={filters.page === 1}
                >
                  «
                </button>

                {[...Array(pagination.totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    className={`join-item btn ${
                      filters.page === index + 1 ? 'btn-active' : ''
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  className="join-item btn"
                  onClick={() => handlePageChange(filters.page + 1)}
                  disabled={filters.page === pagination.totalPages}
                >
                  »
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllTickets;
