import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ticketAPI } from '../../../utils/api';
import TicketCard from '../../../Components/TicketCard';
import toast from 'react-hot-toast';

const Home = () => {
  const [advertisedTickets, setAdvertisedTickets] = useState([]);
  const [latestTickets, setLatestTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);

      // Fetch advertised tickets
      const advertisedResponse = await ticketAPI.getAdvertisedTickets();
      if (advertisedResponse.success) {
        setAdvertisedTickets(advertisedResponse.data);
      }

      // Fetch latest tickets
      const latestResponse = await ticketAPI.getLatestTickets();
      if (latestResponse.success) {
        setLatestTickets(latestResponse.data);
      }
    } catch (error) {
      console.error('Error fetching home data:', error);
      toast.error('Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero min-h-[500px] bg-gradient-to-r from-primary to-secondary text-white">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">Welcome to TicketBari</h1>
            <p className="text-xl mb-8">
              Book bus, train, launch & flight tickets easily. Your journey
              starts here!
            </p>
            <Link to="/all-tickets" className="btn btn-accent btn-lg">
              Browse All Tickets
            </Link>
          </div>
        </div>
      </section>

      {/* Advertised Tickets Section */}
      {advertisedTickets.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Tickets</h2>
            <p className="text-gray-600">Handpicked tickets just for you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advertisedTickets.map(ticket => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
        </section>
      )}

      {/* Latest Tickets Section */}
      {latestTickets.length > 0 && (
        <section className="container mx-auto px-4 py-16 bg-base-200">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Latest Tickets</h2>
            <p className="text-gray-600">
              Recently added tickets from our vendors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {latestTickets.map(ticket => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/all-tickets" className="btn btn-primary btn-wide">
              View All Tickets
            </Link>
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Why Choose TicketBari?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body items-center text-center">
              <div className="text-5xl mb-4">🎫</div>
              <h3 className="card-title">Easy Booking</h3>
              <p>
                Book tickets in just a few clicks. Simple and hassle-free
                process.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body items-center text-center">
              <div className="text-5xl mb-4">💳</div>
              <h3 className="card-title">Secure Payment</h3>
              <p>
                Pay safely with Stripe. Your transactions are fully protected.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body items-center text-center">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="card-title">Instant Confirmation</h3>
              <p>Get immediate booking confirmation. No waiting required.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="container mx-auto px-4 py-16 bg-base-200">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Popular Routes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { from: 'Dhaka', to: 'Chittagong' },
            { from: 'Dhaka', to: 'Sylhet' },
            { from: 'Dhaka', to: "Cox's Bazar" },
            { from: 'Chittagong', to: 'Sylhet' },
          ].map((route, index) => (
            <Link
              key={index}
              to={`/all-tickets?fromLocation=${route.from}&toLocation=${route.to}`}
              className="card bg-gradient-to-r from-primary to-secondary text-white hover:shadow-xl transition-all duration-300"
            >
              <div className="card-body">
                <h3 className="card-title text-lg">
                  {route.from} → {route.to}
                </h3>
                <p className="text-sm opacity-90">Search tickets</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
