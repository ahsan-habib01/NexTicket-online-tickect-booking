import useAuth from '../../../Hooks/useAuth';
import useUserRole from '../../../Hooks/useUserRole';

const UserProfile = () => {
  const { user } = useAuth();
  const { role } = useUserRole(user?.email);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {/* Profile Picture */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
            <div className="avatar">
              <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={user?.photoURL || 'https://via.placeholder.com/200'}
                  alt="Profile"
                />
              </div>
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold">{user?.displayName}</h2>
              <p className="text-gray-500">{user?.email}</p>
              <div className="badge badge-primary badge-lg mt-2">{role}</div>
            </div>
          </div>

          <div className="divider"></div>

          {/* Profile Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Full Name</span>
                </label>
                <input
                  type="text"
                  value={user?.displayName || 'N/A'}
                  className="input input-bordered w-full"
                  readOnly
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  value={user?.email || 'N/A'}
                  className="input input-bordered w-full"
                  readOnly
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Role</span>
                </label>
                <input
                  type="text"
                  value={role || 'Loading...'}
                  className="input input-bordered w-full"
                  readOnly
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Account Created
                  </span>
                </label>
                <input
                  type="text"
                  value={new Date(
                    user?.metadata?.creationTime
                  ).toLocaleDateString()}
                  className="input input-bordered w-full"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
