import { useEffect, useState } from "react";
import { getAdminLeads } from "../services/api";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAdminLeads();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 FETCH USER DASHBOARD
  const fetchUserDashboard = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://crm-2umd.onrender.com/api/crm/dashboard/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setDashboardData(data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 CLICK HANDLER (IMPORTANT FIX)
  const handleUserClick = (user) => {
    setSelectedUser(user);
    fetchUserDashboard(user.id);
  };

  // 🔹 ACTION FUNCTIONS
  const handleEdit = (user) => {
    console.log("Edit user:", user);
  };

  const handleEnable = (id) => {
    console.log("Enable user:", id);
  };

  const handleDisable = (id) => {
    console.log("Disable user:", id);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

      <h2 className="text-xl font-semibold mb-4">All Users</h2>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Contact</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">

                {/* ✅ CLICKABLE ID */}
                <td
                  className="p-3 text-blue-600 cursor-pointer font-medium underline"
                  onClick={() => handleUserClick(user)}
                >
                  {user.id}
                </td>

                <td className="p-3">{user.fullName}</td>
                <td className="p-3">{user.contactNumber}</td>
                <td className="p-3 text-gray-600">{user.address}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      user.role === "ADMIN"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleEnable(user.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded text-xs"
                  >
                    Enable
                  </button>

                  <button
                    onClick={() => handleDisable(user.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                  >
                    Disable
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔥 MODAL POPUP */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white w-[90%] max-w-3xl p-6 rounded-xl shadow-lg relative">

            {/* CLOSE BUTTON */}
            <button
              onClick={() => {
                setSelectedUser(null);
                setDashboardData(null);
              }}
              className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded"
            >
              Back
            </button>

            {/* TITLE */}
            <h2 className="text-xl font-semibold mb-4">
              {selectedUser.fullName} Dashboard
            </h2>

            {/* DATA */}
            {!dashboardData ? (
              <p>Loading...</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                <div className="bg-gray-100 p-4 rounded">
                  <p className="text-sm text-gray-500">Total Leads</p>
                  <h3 className="text-lg font-semibold">
                    {dashboardData.totalLeads}
                  </h3>
                </div>

                <div className="bg-gray-100 p-4 rounded">
                  <p className="text-sm text-gray-500">Materialized</p>
                  <h3 className="text-lg font-semibold">
                    {dashboardData.totalMaterializedLeads}
                  </h3>
                </div>

                <div className="bg-gray-100 p-4 rounded">
                  <p className="text-sm text-gray-500">Prospective</p>
                  <h3 className="text-lg font-semibold">
                    {dashboardData.totalProspectiveLeads}
                  </h3>
                </div>

                <div className="bg-gray-100 p-4 rounded">
                  <p className="text-sm text-gray-500">Today Leads</p>
                  <h3 className="text-lg font-semibold">
                    {dashboardData.todayNewLeads}
                  </h3>
                </div>

                <div className="bg-gray-100 p-4 rounded">
                  <p className="text-sm text-gray-500">Follow Ups</p>
                  <h3 className="text-lg font-semibold">
                    {dashboardData.todayFollowUpLeads}
                  </h3>
                </div>

              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}