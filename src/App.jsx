import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import NewLead from "./pages/NewLead";
import AddRemark from "./pages/AddRemark";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import MyLeads from "./pages/MyLeads";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="flex-1 flex flex-col">
          <Navbar setIsOpen={setIsOpen} />

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/new-lead" element={<NewLead />} />
            <Route path="/add-remark" element={<AddRemark />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/myLeads" element={<MyLeads />} />
          </Routes>

          <Footer/>

        </div>
      </div>
    </BrowserRouter>
  );
}