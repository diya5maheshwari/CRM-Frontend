import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard  from "./pages/Dashboard";

export default function App() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

       <Dashboard/>
      </div>
    </div>
  );
}