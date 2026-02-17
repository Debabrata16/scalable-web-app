import { useState, useEffect, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch profile
  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      setProfile(res.data);
    } catch (error) {
      console.error("Profile error:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchProfile();
  }, []);

  // Add task
  const addTask = async () => {
    if (!title.trim()) return;

    try {
      await API.post("/tasks", { title });
      setTitle("");
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // Logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Filtered tasks
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col">

      {/* Navbar */}
      <div className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-indigo-600">
          Task Dashboard
        </h1>

        <div className="flex items-center gap-4">
          
          {/* Profile */}
          {profile && (
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
                {profile.name?.charAt(0).toUpperCase()}
              </div>
              <span className="text-gray-700 font-medium">
                {profile.name}
              </span>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>

        </div>

      </div>

      {/* Main */}
      <div className="flex justify-center items-start flex-1 p-6">

        <div className="w-full max-w-2xl space-y-6">

          {/* Search */}
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* Add Task */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Add New Task
            </h2>

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <button
                onClick={addTask}
                className="bg-indigo-600 text-white px-6 rounded-lg hover:bg-indigo-700 transition"
              >
                Add
              </button>
            </div>
          </div>

          {/* Tasks */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Your Tasks ({filteredTasks.length})
            </h2>

            {loading ? (
              <div className="text-center text-gray-400 py-6">
                Loading tasks...
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="text-center text-gray-400 py-6">
                No tasks found
              </div>
            ) : (
              filteredTasks.map(task => (
                <div
                  key={task._id}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-lg mb-3 hover:bg-indigo-50 transition"
                >
                  <span className="text-gray-700 font-medium">
                    {task.title}
                  </span>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
