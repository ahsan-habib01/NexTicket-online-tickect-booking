import { useState } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import { ticketAPI } from '../../../utils/api';
import toast from 'react-hot-toast';

const AddTicket = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    fromLocation: '',
    toLocation: '',
    transportType: 'Bus',
    pricePerUnit: '',
    quantity: '',
    departureDate: '',
    departureTime: '',
    perks: [],
  });

  // Available perks options
  const availablePerks = [
    'AC',
    'WiFi',
    'Breakfast',
    'Lunch',
    'Snacks',
    'Water',
    'Charging Point',
    'TV',
  ];

  // Handle input change
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle perks checkbox
  const handlePerksChange = perk => {
    setFormData(prev => ({
      ...prev,
      perks: prev.perks.includes(perk)
        ? prev.perks.filter(p => p !== perk)
        : [...prev.perks, perk],
    }));
  };

  // Handle image preview
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload image to ImgBB
  const uploadImage = async imageFile => {
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

    if (!apiKey) {
      throw new Error(
        'ImgBB API key not found. Please add VITE_IMGBB_API_KEY to .env.local'
      );
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();

    if (!data.success) {
      throw new Error('Image upload failed');
    }

    return data.data.url;
  };

  // Handle form submit
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get image file
      const imageFile = e.target.image.files[0];

      if (!imageFile) {
        toast.error('Please select an image');
        setLoading(false);
        return;
      }

      // Upload image to ImgBB
      toast.loading('Uploading image...', { id: 'image-upload' });
      const imageURL = await uploadImage(imageFile);
      toast.success('Image uploaded!', { id: 'image-upload' });

      // Prepare ticket data
      const ticketData = {
        ...formData,
        pricePerUnit: parseFloat(formData.pricePerUnit),
        quantity: parseInt(formData.quantity),
        imageURL,
        vendorName: user?.displayName || 'Unknown',
        vendorEmail: user?.email,
      };

      // Send to backend
      toast.loading('Adding ticket...', { id: 'add-ticket' });
      const response = await ticketAPI.addTicket(ticketData);

      if (response.success) {
        toast.success(
          'Ticket added successfully! Waiting for admin approval.',
          { id: 'add-ticket' }
        );

        // Reset form
        setFormData({
          title: '',
          fromLocation: '',
          toLocation: '',
          transportType: 'Bus',
          pricePerUnit: '',
          quantity: '',
          departureDate: '',
          departureTime: '',
          perks: [],
        });
        setImagePreview(null);
        e.target.reset();

        // Navigate to My Tickets page
        setTimeout(() => {
          navigate('/dashboard/vendor/my-tickets');
        }, 1500);
      }
    } catch (error) {
      console.error('Error adding ticket:', error);
      toast.error(error.message || 'Failed to add ticket', {
        id: 'add-ticket',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Ticket</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-base-200 p-8 rounded-lg"
      >
        {/* Ticket Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Ticket Title *</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Dhaka to Chittagong Express"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* From and To Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                From (Location) *
              </span>
            </label>
            <input
              type="text"
              name="fromLocation"
              value={formData.fromLocation}
              onChange={handleChange}
              placeholder="e.g., Dhaka"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">To (Location) *</span>
            </label>
            <input
              type="text"
              name="toLocation"
              value={formData.toLocation}
              onChange={handleChange}
              placeholder="e.g., Chittagong"
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        {/* Transport Type and Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Transport Type *</span>
            </label>
            <select
              name="transportType"
              value={formData.transportType}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
              <option value="Launch">Launch</option>
              <option value="Plane">Plane</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Price (Per Unit) *
              </span>
            </label>
            <input
              type="number"
              name="pricePerUnit"
              value={formData.pricePerUnit}
              onChange={handleChange}
              placeholder="e.g., 800"
              min="1"
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        {/* Ticket Quantity */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Ticket Quantity *</span>
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="e.g., 40"
            min="1"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Departure Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Departure Date *</span>
            </label>
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Departure Time *</span>
            </label>
            <input
              type="time"
              name="departureTime"
              value={formData.departureTime}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        {/* Perks */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">
              Perks (Select all that apply)
            </span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
            {availablePerks.map(perk => (
              <label
                key={perk}
                className="label cursor-pointer justify-start gap-2"
              >
                <input
                  type="checkbox"
                  checked={formData.perks.includes(perk)}
                  onChange={() => handlePerksChange(perk)}
                  className="checkbox checkbox-primary checkbox-sm"
                />
                <span className="label-text">{perk}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Ticket Image *</span>
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
            required
          />

          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full max-w-md h-48 object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Vendor Info (Read-only) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Vendor Name</span>
            </label>
            <input
              type="text"
              value={user?.displayName || 'Unknown'}
              className="input input-bordered w-full"
              readOnly
              disabled
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Vendor Email</span>
            </label>
            <input
              type="email"
              value={user?.email || ''}
              className="input input-bordered w-full"
              readOnly
              disabled
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary flex-1"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner"></span>
                Adding Ticket...
              </>
            ) : (
              'Add Ticket'
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate('/dashboard/vendor/my-tickets')}
            className="btn btn-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTicket;
