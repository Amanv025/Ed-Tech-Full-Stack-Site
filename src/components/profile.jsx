

const Profile = ({ user, onLogout }) => {
  return (
    <div className="relative flex items-center space-x-4">
      <div className="text-gray-700">
        <span className="font-bold">{user.email}</span>
      </div>
      <button 
        onClick={onLogout} 
        className="text-gray-700 hover:text-gray-900"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
