// import { useEffect, useState } from "react";
// import { getUsers } from "../services/api";

// export default function ExecutiveDashboard() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const data = await getUsers();
//       setUsers(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <h2>Executive Dashboard</h2>

//       {users.map((u, i) => (
//         <div key={i}>{u.name}</div>
//       ))}
//     </div>
//   );
// }


import DashboardLayout from "./DashboardLayout";

export default function ExecutiveDashboard() {
  return <DashboardLayout role="EXECUTIVE" />;
}