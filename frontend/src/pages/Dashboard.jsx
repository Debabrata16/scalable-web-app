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

  useEffect(() => {
    fetchTasks();
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

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col">

      {/* Navbar */}
      <div className="bg-white shadow-md px-8 py-4 flex justify-between items-center transition-all duration-300 hover:shadow-lg">

        <h1 className="text-2xl font-bold text-indigo-600 tracking-wide">
          Task Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="
            bg-red-500 text-white px-5 py-2 rounded-lg
            transition-all duration-300
            hover:bg-red-600 hover:scale-105
            active:scale-95
            shadow-md hover:shadow-lg
          "
        >
          Logout
        </button>

      </div>

      {/* Main Content */}
      <div className="flex justify-center items-start flex-1 p-6">

        <div className="
          w-full max-w-2xl
          space-y-6
          animate-fadeIn
        ">

          {/* Search */}
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full p-3 rounded-xl border
              shadow-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-400
              transition-all duration-300
              hover:shadow-md
            "
          />

          {/* Add Task Card */}
          <div className="
            bg-white p-6 rounded-xl shadow-md
            transition-all duration-300
            hover:shadow-xl hover:-translate-y-1
          ">

            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Add New Task
            </h2>

            <div className="flex gap-3">

              <input
                type="text"
                placeholder="Enter task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="
                  flex-1 p-3 border rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-indigo-400
                  transition-all duration-300
                "
              />

              <button
                onClick={addTask}
                className="
                  bg-indigo-600 text-white px-6 rounded-lg
                  transition-all duration-300
                  hover:bg-indigo-700 hover:scale-105
                  active:scale-95
                  shadow-md hover:shadow-lg
                "
              >
                Add
              </button>

            </div>

          </div>

          {/* Tasks Card */}
          <div className="
            bg-white p-6 rounded-xl shadow-md
            transition-all duration-300
            hover:shadow-xl hover:-translate-y-1
          ">

            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Your Tasks ({tasks.length})
            </h2>

            {loading ? (

              <div className="text-center text-gray-400 py-6 animate-pulse">
                Loading tasks...
              </div>

            ) : tasks.length === 0 ? (

              <div className="text-center text-gray-400 py-6">
                No tasks yet 
              </div>

            ) : (

              tasks
                .filter(task =>
                  task.title.toLowerCase().includes(search.toLowerCase())
                )
                .map(task => (

                  <div
                    key={task.id}
                    className="
                      flex justify-between items-center
                      bg-gray-50 p-3 rounded-lg mb-3
                      transition-all duration-300
                      hover:bg-indigo-50 hover:shadow-md hover:scale-[1.02]
                    "
                  >

                    <span className="text-gray-700 font-medium">
                      {task.title}
                    </span>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="
                        bg-red-500 text-white px-4 py-1 rounded-lg
                        transition-all duration-300
                        hover:bg-red-600 hover:scale-105
                        active:scale-95
                      "
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
