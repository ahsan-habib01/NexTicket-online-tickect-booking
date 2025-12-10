import { Link } from 'react-router';

const TicketCard = ({ ticket }) => {
  const {
    _id,
    title,
    fromLocation,
    toLocation,
    transportType,
    pricePerUnit,
    quantity,
    perks = [],
    imageURL,
  } = ticket;

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300">
      {/* Image */}
      <figure className="h-48 overflow-hidden">
        <img
          src={imageURL || 'https://via.placeholder.com/400x200?text=No+Image'}
          alt={title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </figure>

      <div className="card-body">
        {/* Transport Type Badge */}
        <div className="badge badge-primary badge-sm mb-2">{transportType}</div>

        {/* Title */}
        <h2 className="card-title text-lg text-base-content">
          {title}
          {quantity === 0 && (
            <div className="badge badge-error badge-sm">Sold Out</div>
          )}
        </h2>

        {/* Route */}
        <div className="flex items-center gap-2 text-sm text-base-content/70">
          <span className="font-semibold">{fromLocation}</span>
          <span>→</span>
          <span className="font-semibold">{toLocation}</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-2">
          <div>
            <p className="text-2xl font-bold text-primary">৳{pricePerUnit}</p>
            <p className="text-xs text-base-content/50">per ticket</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-base-content">
              {quantity} tickets
            </p>
            <p className="text-xs text-base-content/50">available</p>
          </div>
        </div>

        {/* Perks */}
        {perks.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {perks.slice(0, 3).map((perk, index) => (
              <span key={index} className="badge badge-outline badge-sm">
                {perk}
              </span>
            ))}
            {perks.length > 3 && (
              <span className="badge badge-outline badge-sm">
                +{perks.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Action Button */}
        <div className="card-actions justify-end mt-4">
          <Link to={`/ticket/${_id}`} className="btn btn-primary btn-sm w-full">
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
