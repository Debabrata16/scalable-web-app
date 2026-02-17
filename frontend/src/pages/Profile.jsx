import { useEffect, useState } from "react";
import API from "../api/axios";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/auth/profile");
        setUser(res.data);
      } catch (err) {
        console.error("Profile fetch error", err);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md hover:shadow-2xl transition-all duration-300">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
          My Profile
        </h2>

        <div className="space-y-3 text-gray-700">
          <p><span className="font-semibold">Name:</span> {user.name}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">User ID:</span> {user.id}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
