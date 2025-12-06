import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { paymentAPI, bookingAPI } from '../utils/api';
import toast from 'react-hot-toast';

// Load Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Payment Form Component
const PaymentForm = ({ booking, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        // Update booking to paid
        await bookingAPI.markAsPaid(booking._id, paymentIntent.id);

        // Save transaction
        await paymentAPI.saveTransaction({
          transactionId: paymentIntent.id,
          userEmail: booking.userEmail,
          bookingId: booking._id,
          ticketTitle: booking.ticketTitle,
          amount: booking.totalPrice,
          paymentDate: new Date(),
          status: 'completed',
        });

        toast.success('Payment successful!');
        onSuccess();
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-outline flex-1"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="btn btn-primary flex-1"
        >
          {loading ? (
            <>
              <span className="loading loading-spinner"></span>
              Processing...
            </>
          ) : (
            `Pay ৳${booking.totalPrice}`
          )}
        </button>
      </div>
    </form>
  );
};

// Main Payment Modal Component
const PaymentModal = ({ booking, isOpen, onClose, onSuccess }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);

  const initializePayment = async () => {
    try {
      setLoading(true);
      const response = await paymentAPI.createPaymentIntent(booking.totalPrice);

      if (response.success) {
        setClientSecret(response.clientSecret);
      }
    } catch (error) {
      console.error('Error initializing payment:', error);
      toast.error('Failed to initialize payment');
    } finally {
      setLoading(false);
    }
  };

  // Initialize payment when modal opens
  useState(() => {
    if (isOpen && !clientSecret) {
      initializePayment();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-md">
        <h3 className="font-bold text-lg mb-4">Complete Payment</h3>

        {/* Booking Details */}
        <div className="bg-base-200 p-4 rounded-lg mb-4">
          <h4 className="font-semibold mb-2">{booking.ticketTitle}</h4>
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span>Quantity:</span>
              <span className="font-semibold">{booking.bookingQuantity}</span>
            </div>
            <div className="flex justify-between">
              <span>Route:</span>
              <span className="font-semibold text-xs">
                {booking.fromLocation} → {booking.toLocation}
              </span>
            </div>
            <div className="divider my-2"></div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-primary">৳{booking.totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        {loading ? (
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : clientSecret ? (
          <Elements stripe={stripePromise} options={options}>
            <PaymentForm
              booking={booking}
              onSuccess={onSuccess}
              onCancel={onClose}
            />
          </Elements>
        ) : (
          <div className="text-center py-8">
            <p className="text-error">Failed to initialize payment</p>
            <button onClick={onClose} className="btn btn-outline mt-4">
              Close
            </button>
          </div>
        )}
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default PaymentModal;
