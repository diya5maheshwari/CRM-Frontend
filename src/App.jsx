// import { useState } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Sidebar from "./components/Sidebar/Sidebar";
// import Navbar from "./components/Navbar";

// import Dashboard from "./pages/Dashboard";
// import NewLead from "./pages/NewLead";
// import AddRemark from "./pages/AddRemark";
// import Profile from "./pages/Profile";
// import Footer from "./components/Footer";
// import MyLeads from "./pages/MyLeads";
// import Login from "./pages/Login";
// // import Dashboard from "./pages/Dashboard";
// import PrivateRoute from "./components/PrivateRoute";

// export default function App() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <BrowserRouter>
//       <div className="flex">
//         <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

//         <div className="flex-1 flex flex-col">
//           <Navbar setIsOpen={setIsOpen} />

//           <Routes>
//             <Route path="/login" element={<Login />} />
//               <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
//             {/* <Route path="/" element={<Dashboard />} /> */}
//             <Route path="/new-lead" element={<NewLead />} />
//             <Route path="/add-remark" element={<AddRemark />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/myLeads" element={<MyLeads />} />
//           </Routes>

//           <Footer/>

//         </div>
//       </div>
//     </BrowserRouter>
//   );
// }

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Dashboard from "./pages/Dashboard";
import NewLead from "./pages/NewLead";
import AddRemark from "./pages/AddRemark";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import AllUsers from "./pages/AllUsers";
import OrphanCompanies from "./pages/OrphanCompanies";
import Leads from "./pages/Leads";
// import AddRemark from "./pages/AddRemark";

import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/*  LOGIN PAGE (NO NAVBAR / SIDEBAR) */}
        <Route path="/login" element={<Login />} />

        {/*  PROTECTED ROUTES WITH LAYOUT */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div className="flex">
                <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

                <div className="flex-1 flex flex-col">
                  <Navbar setIsOpen={setIsOpen} />

                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/new-lead" element={<NewLead />} />
                    <Route path="/add-remark" element={<AddRemark />} />
                    <Route path="/profile" element={<Profile />} />{" "}
                    <Route path="/all-users" element={<AllUsers />} />
                    <Route
                      path="/orphan-companies"
                      element={<OrphanCompanies />}
                    />
                    <Route path="/myLeads" element={<Leads type="my" />} />
                    <Route
                      path="/all-leads"
                      element={<Leads type="all" />}
                    />{" "}

                                      <Route path="/lead/:id/remarks" element={<AddRemark />} />

                  </Routes>
                  <Footer />
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
