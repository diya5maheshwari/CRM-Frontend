const BASE_URL = "https://crm-2umd.onrender.com";

//  LOGIN
export const loginUser = async (username, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();   

  // console.log("LOGIN RESPONSE:", data);

  if (!res.ok) throw new Error("Login failed");

  return data;
};

// GET LEADS (ADMIN)
export const getAdminLeads = async () => {
  const token = localStorage.getItem("token");
  // console.log("Sending token:", token);

  const res = await fetch(`${BASE_URL}/api/crm/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch leads");
  return res.json();
};

//  GET LEADS (EXECUTIVE - same for now)
export const getExecutiveLeads = async () => {
  return getAdminLeads(); // later change API if needed
};

//  DELETE (ADMIN ONLY)
export const deleteLead = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/crm/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Delete failed");
};

export const getAdminDashboard = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    "https://crm-2umd.onrender.com/api/crm/dashboard/admin",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) throw new Error("Failed to fetch dashboard");

  return res.json();
};

export const createLead = async (formData) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    "https://crm-2umd.onrender.com/api/crm/companie/save", // ✅ fixed
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    },
  );

  const text = await res.text();
  // console.log("RAW RESPONSE:", text);

  if (!res.ok) {
    throw new Error("Failed to create lead");
  }

  return JSON.parse(text);
};
